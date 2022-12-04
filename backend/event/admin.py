from django.contrib import admin
from django.utils.html import format_html
from . import models


@admin.register(models.Event)
class EventAdmin(admin.ModelAdmin):
    autocomplete_fields = ['location']
    actions = ['clear_inventory']
    list_display=['title', 'unit_price','location_title', 'inventory', 'image']
    list_editable = ['unit_price']
    list_filter = ['date','location']
    list_per_page=10
    list_select_related=['location']
    search_fields=['title']

    def location_title(self, event):
        return event.location.title

    @admin.action(description='Clear inventory')
    def clear_inventory(self, request, queryset):
        updated_count = queryset.update(inventory=0)
        self.message_user(
            request,
            f'{updated_count} product were successfuly updated'
        )

@admin.register(models.Location)
class LocationAdmin(admin.ModelAdmin):
    list_display=['title']
    search_fields=['title']

@admin.display(ordering='event_count')
def event_count(self, collection):
    return format_html('<a href="google.com">{}</a>')

# @admin.register(models.Student)
# class StudentAdmin(admin.ModelAdmin):
#     list_display=['first_name', 'student_id']
#     search_fields=['first_name', 'last_name']
    
class orderItemInline(admin.StackedInline):
    autocomplete_fields =['event']
    min_num =1
    max_num =5
    model=models.OrderItem
    extra=0

@admin.register(models.Order)
class OrderAdmin(admin.ModelAdmin):
    autocomplete_fields = ['student']
    list_display=['id', 'placed_at', 'student_id']
    inlines=[orderItemInline]
