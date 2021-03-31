from rest_framework.permissions import BasePermission


class IsFree (BasePermission):
    def has_permission(self, request, View):
        if request.user:
            return True
        else:
            return True