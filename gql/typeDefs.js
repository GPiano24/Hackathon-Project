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
        id: ID
        name: String
        capacity: Int
        status: String
    }
    
    type Booking{
        id: ID
        userID: String
        roomID: String
        approved_ind: Int
        booking_reason: String
        from_booking: String
        to_booking: String
        remarks: String
    }
`

module.exports = typeDefs;