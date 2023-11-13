CREATE OR REPLACE FUNCTION follower_count_update()
RETURNS TRIGGER
AS $$
BEGIN
    UPDATE client
    SET follower_count =
            (
                SELECT count(*)
                FROM client AS c
                JOIN follow AS f ON f.followee_id = c.id
                WHERE f.followee_id = NEW.followee_id
            )
    WHERE client.id = NEW.followee_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
