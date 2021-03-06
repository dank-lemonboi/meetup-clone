select groups.group_name, groups.url_name, groups.categories, events.*,
(select count(user_id) from attendees where event_id = events.event_id) as attendees
from events join groups on events.group_id = groups.group_id
order by events.start_date asc
