USE MU_CENTRALIZED_SCHEDULING;

INSERT INTO USERS (user_id, username, password, first_name, middle_name, last_name)
     VALUES
     ('510645', 'vicenv', 'M@nul!fe', 'Vhea', 'Perey', 'Vicente'),
     ('000045', 'johndoe', 'password1', 'John', 'Some', 'Doe'),
     ('111111', 'jane', 'password2', 'Jane', 'Any', 'Doe');

INSERT INTO ROLES (role_id, role_name, role_description)
    VALUES
    ('01', 'student', 'something about student'),
    ('02', 'teacher', 'something about teacher'),
    ('03', 'admin', 'something about admin');

INSERT INTO USER_ROLES (user_id, role_id)
    VALUES
    ('510645', '01'),
    ('000045', '03'),
    ('111111', '02');
     
INSERT INTO ROOMS (room_id, room_name, capacity)
VALUES
    ('R001', 'Chemistry Room', 200),
    ('R002', 'Computer Room', 150),
    ('R003', 'Physics Lab', 100),
    ('R004', 'Biology Lab', 80),
    ('R005', 'Lecture Hall A', 300),
    ('R006', 'Lecture Hall B', 300),
    ('R007', 'Seminar Room 1', 50),
    ('R008', 'Seminar Room 2', 50),
    ('R009', 'Auditorium', 500),
    ('R010', 'Music Room', 70);

INSERT INTO ROOM_BOOKINGS (booking_id, user_id, room_id, status, booking_reason, date_booked, from_booking, to_booking, remarks)
VALUES
    ('BK0001', '510645', 'R001', 'approved', 'For Chemistry class', NOW() - INTERVAL 5 DAY, NOW() + INTERVAL 1 HOUR, NOW() + INTERVAL 3 HOUR, 'Approved'),
    ('BK0002', '000045', 'R002', 'pending', 'Computer lab exam', NOW() - INTERVAL 4 DAY, NOW() + INTERVAL 2 HOUR, NOW() + INTERVAL 4 HOUR, 'Pending approval'),
    ('BK0003', '111111', 'R003', 'declined', 'Physics experiment', NOW() - INTERVAL 3 DAY, NOW() + INTERVAL 1 HOUR, NOW() + INTERVAL 3 HOUR, 'Declined due to scheduling conflict'),
    ('BK0004', '510645', 'R004', 'approved', 'Biology practicals', NOW() - INTERVAL 2 DAY, NOW() + INTERVAL 4 HOUR, NOW() + INTERVAL 6 HOUR, 'Approved'),
    ('BK0005', '000045', 'R005', 'declined', 'Team meeting', NOW() - INTERVAL 6 DAY, NOW() + INTERVAL 2 HOUR, NOW() + INTERVAL 3 HOUR, 'Declined due to overlapping booking'),
    ('BK0006', '111111', 'R006', 'approved', 'Lecture series', NOW() - INTERVAL 5 DAY, NOW() + INTERVAL 5 HOUR, NOW() + INTERVAL 7 HOUR, 'Approved'),
    ('BK0007', '510645', 'R007', 'pending', 'Chemistry lab session', NOW() - INTERVAL 7 DAY, NOW() + INTERVAL 3 HOUR, NOW() + INTERVAL 5 HOUR, 'Pending approval'),
    ('BK0008', '000045', 'R008', 'declined', 'Software testing session', NOW() - INTERVAL 1 DAY, NOW() + INTERVAL 6 HOUR, NOW() + INTERVAL 8 HOUR, 'Declined due to room unavailability'),
    ('BK0009', '111111', 'R009', 'declined', 'Guest lecture', NOW() - INTERVAL 8 DAY, NOW() + INTERVAL 1 HOUR, NOW() + INTERVAL 3 HOUR, 'Declined due to scheduling conflict'),
    ('BK0010', '510645', 'R010', 'approved', 'Music recital', NOW() - INTERVAL 3 DAY, NOW() + INTERVAL 2 HOUR, NOW() + INTERVAL 4 HOUR, 'Approved');