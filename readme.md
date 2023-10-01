# DIGITAL COW HUT

## USER
- https://dg-cow-be-afnanferdousi.vercel.app/api/v1/auth/signup (POST)
- https://dg-cow-be-afnanferdousi.vercel.app/api/v1/users (GET) Get All Users
- https://dg-cow-be-afnanferdousi.vercel.app/api/v1/auth/64d901fb072560b32d9a807d (GET) Get a specific user id
- https://dg-cow-be-afnanferdousi.vercel.app/api/v1/auth/64d901fb072560b32d9a807d (PATCH) Update a specific user id
- https://dg-cow-be-afnanferdousi.vercel.app/api/v1/auth/64be9c18a098ed1d68669f78 (DELETE) Delete a specific with an id

## COWS

- https://dg-cow-be-afnanferdousi.vercel.app/api/v1/cows (POST)
- https://dg-cow-be-afnanferdousi.vercel.app/api/v1/cows (GET)
- https://dg-cow-be-afnanferdousi.vercel.app/api/v1/cows/64b380546248de63d8b63d32 (GET) Get a specific cow with an id
- https://dg-cow-be-afnanferdousi.vercel.app/api/v1/cows/64b380546248de63d8b63d32 (PATCH) Update a specific cow with an id
- https://dg-cow-be-afnanferdousi.vercel.app/api/v1/cows/64ae88536248de63d8b63ca3 (DELETE) Delete a specific cow with an id

## ORDERS

- https://dg-cow-be-afnanferdousi.vercel.app/api/v1/orders (POST)
- https://dg-cow-be-afnanferdousi.vercel.app/api/v1/orders (GET)
- https://dg-cow-be-afnanferdousi.vercel.app/api/v1/orders/64a2e17dd0d6f6ac76627a05 (GET) Get a specific order with an id

 
## Pagination and Filtering routes of Cows

- https://dg-cow-be-afnanferdousi.vercel.app/api/v1/cow?page=1&limit=10
- https://dg-cow-be-afnanferdousi.vercel.app/api/v1/cow?sortBy=price&sortOrder=asc
- https://dg-cow-be-afnanferdousi.vercel.app/api/v1/cow?minPrice=20000&maxPrice=70000
- https://dg-cow-be-afnanferdousi.vercel.app/api/v1/cow?location=Dhaka
- https://dg-cow-be-afnanferdousi.vercel.app/api/v1/cow?searchTerm=Cha
