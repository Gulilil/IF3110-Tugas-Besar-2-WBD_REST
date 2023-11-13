CREATE OR REPLACE FUNCTION post_count_update()
RETURNS TRIGGER
AS $$
BEGIN
    UPDATE forum
    SET post_count =
            (
                SELECT count(*)
                FROM forum AS f
                JOIN post AS p ON f.id = p.forum_id
                WHERE p.forum_id = NEW.forum_id
            )
    WHERE forum.id = NEW.forum_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
