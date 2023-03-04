from django.contrib.auth import get_user_model
from django.core.management import BaseCommand, CommandError


class Command(BaseCommand):
    help = 'Creates multiple users in the database for testing ([!] This removes previous users.)'

    def add_arguments(self, parser):
        parser.add_argument('count', nargs='?', default=3, type=int)

    def handle(self, *args, **options):
        model = get_user_model()
        model.objects.all().delete()
        count = options.get('count')
        if not count or count < 1:
            raise CommandError(f'Incorrect argument: {count} | must be an integer greater than 0')

        model.objects.create_superuser(username='admin', email='admin@gmail.com', password='admin123')
        for index in range(1, count):
            model.objects.create_user(
                username=f'test{index}',
                email=f'test{index}@gmail.com',
                password=f'test{index}123'
            )
        self.stdout.write(self.style.NOTICE(f'[*] Script {self.__module__} ending'))