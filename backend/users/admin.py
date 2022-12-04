from django.contrib import admin
from django.contrib.auth.models import Group
# from rest_framework.authtoken.models import Token
from .models import User
from django.contrib import admin
from django.contrib.auth import admin as upstream
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from django.utils.translation import gettext_lazy as _

# admin.site.unregister(Token)
admin.site.unregister(Group)


class UserAdmin(upstream.UserAdmin):
    fieldsets = (
        (None, {'fields': ('username', 'password', 'email', 'four_by_four', 'student_id', 'phone')}),
        (_('Personal info'), {'fields': ('first_name', 'last_name', 'date_birth')}),
        (_('Permissions'), {'fields': ('is_active', 'is_staff', 'is_superuser',
                                       'groups', 'user_permissions')}),
        (_('Important dates'), {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'password1', 'password2', 'email')}
         ),
    )
    form = UserChangeForm
    add_form = UserCreationForm


    def has_add_permission(self, request, obj=None):
        if not request.user.is_superuser:
            return False
        return True

    def has_delete_permission(self, request, obj=None):
        if not request.user.is_superuser:
            return False
        return True

    def has_change_permission(self, request, obj=None):
        if not request.user.is_superuser:
            return False
        return True

    def has_module_permission(self, request, obj=None):
        if not request.user.is_superuser:
            return False
        return True


try:
    admin.site.unregister(User)
except:
    pass


admin.site.register(User, UserAdmin)