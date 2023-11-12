CREATE TRIGGER follower_count_delete_trg
    AFTER DELETE ON follow
    FOR EACH ROW
EXECUTE FUNCTION follower_count_update();
