from graphene_django import DjangoObjectType
from api.models import CourseTheme

class CourseThemeOutput(DjangoObjectType):
    class Meta:
        model = CourseTheme
        fields = (
            "id",
            "name",
            "order",
            "is_deleted",
            "created_at",
        )
