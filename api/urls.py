from django.urls import path
from api.views import UserView, UserSignleView, TransferMoneyView


urlpatterns = [
    path('user/', UserView.as_view()),
    path('user/<int:pk>/', UserSignleView.as_view()),
    path('transfer-money/', TransferMoneyView.as_view())
]
