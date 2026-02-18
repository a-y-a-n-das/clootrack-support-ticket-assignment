from django.shortcuts import render

from rest_framework import viewsets
from .models import Ticket
from .serializers import TicketSerializer
from rest_framework.response import Response
from django.db.models import Count, Avg
from django.db.models.functions import TruncDate
from rest_framework.decorators import action
from rest_framework import viewsets, filters
import os
import json
from openai import OpenAI


# Create your views here.


class TicketViewSet(viewsets.ModelViewSet):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ["title","description"]

    def get_queryset(self):
        queryset = Ticket.objects.all().order_by("-created_at")
        category = self.request.query_params.get("category")
        priority = self.request.query_params.get("priority")
        status = self.request.query_params.get("status")

        if category:
            queryset = queryset.filter(category=category)

        if priority:
            queryset = queryset.filter(priority=priority)

        if status:
            queryset = queryset.filter(status=status)

        return queryset


    @action(detail=False, methods=['get'])
    def stats(self, request):
        total_tickets = Ticket.objects.count()
        open_tickets = Ticket.objects.filter(status='open').count()
        
        priority_data = (
            Ticket.objects.values('priority').annotate(count=Count('id'))
        )
        
        priority_breakdown = {item['priority']: item['count'] for item in priority_data}

        category_data = (
            Ticket.objects.values('category').annotate(count=Count('id'))
        )

        category_breakdown = {item['category']: item['count'] for item in category_data}

        daily_counts = (
            Ticket.objects.annotate(date=TruncDate('created_at'))
            .values('date')
            .annotate(count=Count('id'))
            
        )

        avg_tickets_per_day = daily_counts.aggregate(avg=Avg('count'))['avg'] or 0

        return Response({
            'total_tickets': total_tickets,
            'open_tickets': open_tickets,
            'priority_breakdown': priority_breakdown,
            'category_breakdown': category_breakdown,
            'avg_tickets_per_day': avg_tickets_per_day,
        })

    @action(detail=False, methods=['post'])
    def classify(self, request):
        description = request.data.get('description', '')

        if not description:
            return Response({'error': 'Description is required for classification.'}, status=400)
        
        prompt = f"""
You are a support ticket classifier.

Classify the following ticket description into:

Categories:
- billing
- technical
- account
- general

Priorities:
- low
- medium
- high
- critical

Return ONLY valid JSON in this exact format:
{{
  "category": "one_of_the_categories",
  "priority": "one_of_the_priorities"
}}

Ticket description:
{description}
"""
        try:
            client = OpenAI(
                api_key=os.getenv("GROQ_API_KEY"),
                base_url = "https://api.groq.com/openai/v1"
            )

            completion = client.chat.completions.create(
                model="openai/gpt-oss-120b",
                messages=[{"role": "user", "content": prompt}],

            )
            raw_text = completion.choices[0].message.content.strip()

            if raw_text.startswith("```json"):
                raw_text = raw_text.split("```")[1]
            
            parsed = json.loads(raw_text)

            return Response({
                'suggested_category': parsed.get('category', 'general'),
                'suggested_priority': parsed.get('priority', 'medium')
            })
        except Exception as e:
            return Response({'error': 'Failed to classify ticket.', 'details': str(e)}, status=500)  