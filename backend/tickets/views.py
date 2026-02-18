from django.shortcuts import render

from rest_framework import viewsets
from .models import Ticket
from .serializers import TicketSerializer
# Create your views here.

class TicketViewSet(viewsets.ModelViewSet):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer

@api_view(['GET'])
def ticket_stats(request):
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