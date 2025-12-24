"""Админка CourseTheme."""

from django.contrib import admin

from api.models.course_theme import CourseTheme


@admin.register(CourseTheme)
class CourseThemeAdmin(admin.ModelAdmin):
    """Настройка отображения CourseTheme."""

    list_display = (
        "id",
        "course",
        "order",
        "name",
        "is_deleted",
        "created_at",
    )

    list_filter = (
        "course",
        "is_deleted",
        "created_at",
    )

    search_fields = (
        "name",
        "course__name",
    )

    fieldsets = (
        (
            "Основная информация",
            {
                "fields": (
                    "course",
                    "name",
                    "order",
                ),
            },
        ),
        (
            "Служебная информация",
            {
                "fields": (
                    "is_deleted",
                    "deleted_at",
                    "updated_at",
                    "created_at",
                ),
            },
        ),
    )

    ordering = ("course", "order")
    date_hierarchy = "created_at"
    readonly_fields = (
        "id",
        "updated_at",
        "created_at",
        "deleted_at",
    )
