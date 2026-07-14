# Vet Appointment Manager API

A RESTful API built with Node.js, Express, and Mongoose that manages a small
veterinary clinic's client, pet, and appointment records.

## Tech Stack

- **Node.js** / **Express** — server and routing
- **MongoDB Atlas** — cloud-hosted database
- **Mongoose** — schema modeling, validation, and querying

 **Client** — a clinic customer (name, email, phone)
- **Pet** — belongs to a Client via `owner` (name, species, breed)
- **Appointment** — belongs to a Pet via `pet` (date, reason, status)

