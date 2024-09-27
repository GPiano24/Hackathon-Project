const { gql } = require('apollo-server')
const typeDefs = gql`
    type Query{
        user(id: ID!): User
        role(id: ID!): Role
        room(id: ID!): Room
        booking(id: ID!): Booking
        users: [User]
        rooms: [Room]
        bookings: [Booking]
    }
    type User{
        id: ID
        username: String
        password: String
        first_name: String
        middle_name: String
        last_name: String
        
    }
 
    type Role {
        id: ID
        name: String
        description: String
    }
    type user_role{
        users: [User]
        roles: [Role]
    }
    type Room {
        ROOM_ID: ID
        ROOM_NAME: String
        CAPACITY: Int
    }
    
    type Booking{
        BOOKING_ID: ID
        USER_ID: String
        ROOM_ID: String
        STATUS: String
        BOOKING_REASON: String
        DATE_BOOKED: String
        FROM_BOOKING: String
        TO_BOOKING: String
        REMARKS: String
    }
`

module.exports = typeDefs;