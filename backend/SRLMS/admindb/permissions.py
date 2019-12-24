from rest_framework import permissions

class IsOfficial(permissions.BasePermission):
    """
    Custom permission to allow only official users to pass.
    """
    def has_object_permission(self, request, view, obj):
        return request.user.is_official