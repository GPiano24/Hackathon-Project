USE MU_CENTRALIZED_SCHEDULING;

INSERT INTO USERS (user_id, username, password, first_name, middle_name, last_name)
     VALUES
     ('510645', 'vicenv', 'M@nul!fe', 'Vhea', 'Perey', 'Vicente'),
     ('574284', 'natche', 'M@nul!fe', 'Nat', 'Bun', 'Reyes');

INSERT INTO ROLES (role_id, role_name, role_description)
     VALUES
     ('TE', 'Teacher', 'Teacher'),
     ('ST', 'Student', 'Student'),
     ('AD', 'Admin', 'Admin');
     

INSERT INTO USER_ROLES (user_id, role_id)
     VALUES
     ('510645', 'ST'),
     ('574284', 'TE');
     

INSERT INTO ROOMS (room_id, room_name, capacity)
    VALUES
    ('R001', 'Chemistry Room', 200),
    ('R002', 'Computer Room', 200),
    ('R003', 'Game Room', 200);
    
INSERT INTO ROOM_BOOKINGS (booking_id, user_id, room_id, status, booking_reason, date_booked, from_booking, to_booking, remarks)
	VALUES
    ('BK0001', '510645', 'R001', 'Approved', 'For Chemistry class', NOW() - 5, NOW(), NOW() + 5, 'Approved'),
    ('BK0002', '510645', 'R001', 'Approved', 'For Chemistry class', NOW() - 4, NOW()-2, NOW() + 4, 'Approved'),
    ('BK0003', '510645', 'R002', 'Approved', 'For Chemistry class', NOW() - 4, '2024-09-27 23:24:09', '2024-09-27 23:25:09', 'Approved');
    
    
    select booking_id, user_id, room_id, approved_ind, booking_reason, date_booked, from_booking, to_booking, remarks from room_bookings
    
    
    select BOOKING_ID, USER_ID, ROOM_ID, status, BOOKING_REASON, DATE_BOOKED, FROM_BOOKING, TO_BOOKING, REMARKS from ROOM_BOOKINGS where room_id='R001' and cast(from_booking as date) <> cast('2024-09-26' as date) and cast(to_booking as date) <= cast('2024-09-29' as date);

select cast(from_booking as date) from ROOM_BOOKINGS

    select BOOKING_ID, USER_ID, ROOM_ID, status, BOOKING_REASON, DATE_BOOKED, FROM_BOOKING, TO_BOOKING, REMARKS from ROOM_BOOKINGS where room_id='R001' and to_booking > NOW()

    select BOOKING_ID, USER_ID, ROOM_ID, status, BOOKING_REASON, DATE_BOOKED, FROM_BOOKING, TO_BOOKING, REMARKS from ROOM_BOOKINGS where room_id<>'R001' and to_booking > NOW()

select BOOKING_ID, USER_ID, ROOM_ID, status, BOOKING_REASON, DATE_BOOKED, FROM_BOOKING, TO_BOOKING, REMARKS from ROOM_BOOKINGS where room_id='R001' and to_booking > NOW() ORDER BY to_booking desc
select BOOKING_ID, USER_ID, ROOM_ID, STATUS, BOOKING_REASON, DATE_BOOKED, FROM_BOOKING, TO_BOOKING, REMARKS from ROOM_BOOKINGS where FROM_BOOKING >= "2024-09-27 23:24:09" and TO_BOOKING <= "2024-09-27 23:25:09" and STATUS <> 'declined'

select BOOKING_ID, USER_ID, ROOM_ID, STATUS, BOOKING_REASON, DATE_BOOKED, FROM_BOOKING, TO_BOOKING, REMARKS from ROOM_BOOKINGS where FROM_BOOKING >= "2024-09-27 23:24:09" and TO_BOOKING <= "2024-09-27 23:25:09" and STATUS <> 'declined'

select r.ROOM_ID FROM ROOMS r
left join ROOM_BOOKINGS rb
    on r.ROOM_ID = rb.ROOM_ID
where rb.FROM_BOOKING >= "2024-09-27 23:24:09" and rb.TO_BOOKING <= "2024-09-27 23:25:09" and STATUS <> 'declined'

SELECT * from room_bookings
select * from rooms where room_id not in ('R001', 'R002')
inner join ;

delete from room_bookings where booking_id in ('JSJ2U0', 'V83PJJ', 'PTDL7Z', '76FQBZ', 'R1Y8L4', 'EHLGOH', 'A8U2GT', '8FKFDX', '0PKX21')
INSERT INTO ROOM_BOOKINGS (booking_id, user_id, room_id, status, booking_reason, date_booked, from_booking, to_booking, remarks) VALUES ('JSJ2U0', '510645', 'R002', 'Pending', 'For an org event', '2024-09-27 06:39:35', '2024-09-28 23:24:09', '2024-09-28 23:25:09', 'Upon Admin approval')