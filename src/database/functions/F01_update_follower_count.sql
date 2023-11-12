CREATE FUNCTION follower_count_update()
RETURNS TRIGGER
AS $$
BEGIN
    UPDATE user
    SET follower_count =
            (
                SELECT count(*)
                FROM user AS u
                JOIN follow AS f ON f.followee_id = u.id
                WHERE f.followee_id = NEW.followee_id
            )
    WHERE u.id = NEW.followee_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
