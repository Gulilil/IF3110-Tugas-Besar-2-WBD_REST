CREATE OR REPLACE TRIGGER post_count_update_trg
    AFTER UPDATE ON post
    FOR EACH ROW
EXECUTE FUNCTION post_count_update();