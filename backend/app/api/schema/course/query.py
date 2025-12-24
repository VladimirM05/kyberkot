
import graphene
from api.models import Course
from api.schema.course.output import CourseType
from api.schema.input import PaginationInput


class CoursesQuery(graphene.ObjectType):
    courses = graphene.List(
        CourseType,
        pagination=PaginationInput(required=True),
    )

    @staticmethod
    def resolve_courses(_, _info, pagination):
        offset = pagination.offset
        limit = pagination.limit

        return (
            Course.objects
            .filter(is_deleted=False)
            .order_by("-created_at")
            [offset: offset + limit]
        )
