from rest_framework.routers import DefaultRouter
from .views import TicketViewSet
from django.urls import path


router = DefaultRouter()
router.register(r"tickets", TicketViewSet)

urlpatterns = router.urls 