CREATE OR REPLACE TRIGGER post_count_delete_trg
    AFTER DELETE ON post
    FOR EACH ROW
EXECUTE FUNCTION post_count_update();
