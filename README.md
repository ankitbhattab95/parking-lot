# Parking lot  project

## Set up

1. Tale a clone of this repo
2. Run `npm install` from inside the repo
3. Mention the DB details in `.env`
2. Feed initial parking data by running `npx migrate-mongo up`

## API flow
1. **create a user** : POST localhost:3000/api/user
2. **get all users** : GET localhost:3000/api/user
3. **get parking status** : GET localhost:3000/api/parking?available=true
4. **book a parking** : POST localhost:3000/api/parking/book
5. **occupy a parking** : POST localhost:3000/api/book/parking/occupy

