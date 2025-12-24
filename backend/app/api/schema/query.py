""""""

import graphene

from api.schema.course.query import CoursesQuery
from api.schema.course_theme.query import CourseThemesQuery
from api.schema.theme_block.query import ThemeBlocksQuery
from api.schema.user.query import UserQuery


class Query(
    UserQuery,
    CoursesQuery,
    CourseThemesQuery,
    ThemeBlocksQuery,
    graphene.ObjectType,
):
    """"""

    pass


schema = graphene.Schema(query=Query)
