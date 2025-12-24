import graphene
from api.models import CourseTheme
from api.schema.course_theme.output import CourseThemeOutput

class CourseThemesQuery(graphene.ObjectType):
    course_themes = graphene.List(
        CourseThemeOutput,
        course_id=graphene.ID(required=True),
    )

    @staticmethod
    def resolve_course_themes(_, _info, course_id):

        return (
            CourseTheme.objects
            .filter(course_id=course_id, is_deleted=False)
            .order_by("order")
        )
