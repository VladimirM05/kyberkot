"""Содержит модель курса."""

from django.db import models
from django.utils.translation import gettext_lazy as _

from api.enums.course_difficulty import CourseDifficulty


class Course(models.Model):
    """Хранит информацию о курсе."""

    name = models.CharField(max_length=128, verbose_name=_("Название"))

    price = models.DecimalField(max_digits=8, decimal_places=2, verbose_name=_("Цена"))
    is_free = models.BooleanField(default=False, verbose_name=_("Бесплатный"))
    description = models.TextField(null=True, blank=True, verbose_name=_("Описание"))
    duration = models.PositiveIntegerField(null=True, blank=True, verbose_name=_("Длительность"))
    difficulty = models.CharField(
        max_length=64,
        choices=CourseDifficulty.choices(),
        default=CourseDifficulty.default(),
        verbose_name=_("Сложность"),
    )

    is_deleted = models.BooleanField(default=False, verbose_name=_("Удален"))
    deleted_at = models.DateTimeField(null=True, blank=True, verbose_name=_("Дата удаления"))

    updated_at = models.DateTimeField(auto_now=True, verbose_name=_("Дата обновления"))
    created_at = models.DateTimeField(auto_now_add=True, verbose_name=_("Дата создания"))

    objects = models.Manager()

    def __str__(self):
        return f"Название: {self.name}"

    class Meta:
        """Метаданные Course."""

        db_table = "course"
        ordering = ("-created_at",)
        verbose_name = _("Курс")
        verbose_name_plural = _("Курсы")
        indexes = (
            models.Index(fields=("name",), name="course_name_idx"),
        )
        constraints = (
            models.UniqueConstraint(fields=("name",), name="unique_course_name"),
        )
