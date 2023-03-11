from django.core.management import BaseCommand
from django.contrib.auth.models import Group, Permission

GROUPS = {
    "Administrators": {
        "project": ["add", "change", "delete", "view"],
        "to do": ["add", "change", "delete", "view"],
        "user": ["add", "change", "delete", "view"],
    },
    "Developers": {
        "project": ["view"],
        "to do": ["add", "change", "delete", "view"],
        "user": ["view"],
    },
    "Manager": {
        "project": ["add", "change", "delete", "view"],
        "to do": ["add", "change", "delete", "view"],
        "user": ["view"],
    },
}


class Command(BaseCommand):
    help = 'Creates user groups to implement the rights system (permission are fixed)'

    def handle(self, *args, **options):
        # Groups to create
        for group_name in GROUPS:
            new_group, created = Group.objects.get_or_create(name=group_name)
            if not created:
                self.stdout.write(self.style.WARNING(f'[!] group {group_name} exists'))
                continue
            self.stdout.write(self.style.SUCCESS(f'[*] Group {group_name} created'))

            # Models for which we specify the permissions
            for model_name in GROUPS[group_name]:
                # Permissions for the current group
                for permission_name in GROUPS[group_name][model_name]:
                    name = f'Can {permission_name} {model_name}'

                    try:
                        obj_permission = Permission.objects.get(name=name)
                    except Permission.DoesNotExist:
                        self.stdout.write(self.style.ERROR(f'[!] Permission "{name}" not added for {group_name}'))
                        continue
                    new_group.permissions.add(obj_permission)
                    self.stdout.write(f'\t"{name}" added')
                self.stdout.write('\n')
        self.stdout.write(self.style.NOTICE(f'[*] Script {self.__module__} ending'))
