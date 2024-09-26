USE MU_CENTRALIZED_SCHEDULING;

INSERT INTO USERS (user_id, username, password, first_name, middle_name, last_name)
     VALUES
     ('510645', 'vicenv', 'M@nul!fe', 'Vhea', 'Perey', 'Vicente');
     ('000045', 'johndoe', 'password1', 'John', 'Some', 'Doe');
     ('111111', 'jane', 'password2', 'Jane', 'Any', 'Doe');

INSERT INTO ROLES (role_id, role_name, role_description)
    VALUES
    ('01', 'student', 'something about student'),
    ('02', 'teacher', 'something about teacher');
    ('03', 'admin', 'something about admin');

INSERT INTO USER_ROLES (user_id, role_id)
    VALUES
    ('510645', '01');
    ('000045', '03');
    ('111111', '02');
     
INSERT INTO ROOMS (room_id, room_name, capacity)
    VALUES
    ('R001', 'Chemistry Room', 200),
    ('R002', 'Computer Room', 200);
    
INSERT INTO ROOM_BOOKINGS (booking_id, user_id, room_id, approved_ind, booking_reason, date_booked, from_booking, to_booking, remarks)
	VALUES
    ('BK0001', '510645', 'R001', 'Y', 'For Chemistry class', NOW() - 5, NOW(), NOW() + 5, 'Approved')
    