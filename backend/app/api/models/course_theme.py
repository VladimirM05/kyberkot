# pylint: disable=too-few-public-methods
"""Содержит модель темы курса."""

from django.db import models
from django.db.models import ForeignKey
from django.utils.translation import gettext_lazy as _

from api.models.course import Course


class CourseTheme(models.Model):
    """Хранит информацию о теме курса."""

    course = ForeignKey(
        Course,
        on_delete=models.CASCADE,
        related_name="themes",
        verbose_name=_("Курс"),
    )

    name = models.CharField(
        max_length=128,
        verbose_name=_("Название темы"),
    )

    order = models.PositiveIntegerField(
        verbose_name=_("Порядковый номер"),
        help_text=_("Используется для корректного отображения тем на фронте"),
    )

    is_deleted = models.BooleanField(
        default=False,
        verbose_name=_("Удалена"),
    )
    deleted_at = models.DateTimeField(
        null=True,
        blank=True,
        verbose_name=_("Дата удаления"),
    )

    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name=_("Дата обновления"),
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name=_("Дата создания"),
    )

    objects = models.Manager()

    def __str__(self):
        return f"{self.course.name} — {self.order}. {self.name}"

    class Meta:
        """Метаданные CourseTheme."""

        db_table = "course_theme"
        verbose_name = _("Тема курса")
        verbose_name_plural = _("Темы курса")
        ordering = ("order",)
        indexes = (
            models.Index(fields=("course", "order"), name="course_theme_order_idx"),
        )
        constraints = (
            models.UniqueConstraint(
                fields=("course", "order"),
                name="unique_theme_order_per_course",
            ),
        )
