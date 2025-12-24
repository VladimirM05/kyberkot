from graphene_django import DjangoObjectType
from api.models import Course


class CourseType(DjangoObjectType):
    class Meta:
        model = Course
        fields = (
            "id",
            "name",
            "description",
            "price",
            "duration",
            "difficulty",
            "created_at",
        )
