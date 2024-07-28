import datetime


def get_current_month_timestamp():
    now = datetime.datetime.now()
    first_day = datetime.datetime(year=now.year, month=now.month, day=1)
    first_second = datetime.datetime(
        year=first_day.year,
        month=first_day.month,
        day=first_day.day,
        hour=0,
        minute=0,
        second=0,
    )
    timestamp = int(first_second.timestamp())
    return timestamp
