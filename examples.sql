--user profile
--1. get all columns for user by id
    --1a. get only a few fields for public version
    --1b. get all fields for private version
--2. get all favorites for a user by id
--3. get all reviews writtn by that user by id


--restaurant profile
--1. get all info for a restaurant by id
--2. get all reviews for restaurant by id
--3. get average review for a restaurant by id
--4. get count of favorites for restaurant by id
select res.name, avg(rev.score), count(fav.user_id)
    from restaurants res
    inner join reviews rev
        on res.id = rev.restaurant_id
    inner join favorites fav
        on res.id = fav.restaurant_id
where res.name ilike 'applebees'
group by res.name, fav.user_id;


--restaurant search result (restaurants in Atlanta, GA)
--1a. get all matching rows for restaurant by name (case insensitive search)
--1b. include average review
--1c. incude number of favorites
--2. limit by minimum review
--3. (SUPER BONUS) pagination