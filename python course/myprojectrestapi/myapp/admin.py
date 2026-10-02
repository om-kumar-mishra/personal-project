from django.contrib import admin
from myapp.models import Book
# Register your models here..

class BookAdmin(admin.ModelAdmin):
    list_display=('title','author','published_date')
    search_fields=('title',)   
    

admin.site.register(Book,BookAdmin)

