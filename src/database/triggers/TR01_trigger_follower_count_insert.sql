CREATE OR REPLACE TRIGGER follower_count_insert_trg
    AFTER INSERT ON follow
    FOR EACH ROW
EXECUTE FUNCTION follower_count_update();
