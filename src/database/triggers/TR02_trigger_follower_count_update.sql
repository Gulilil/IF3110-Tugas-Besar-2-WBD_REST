CREATE TRIGGER follower_count_update_trg
    AFTER UPDATE ON follow
    FOR EACH ROW
EXECUTE FUNCTION follower_count_update();
