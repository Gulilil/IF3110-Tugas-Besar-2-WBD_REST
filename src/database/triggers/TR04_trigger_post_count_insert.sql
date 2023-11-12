CREATE TRIGGER post_count_insert_trg
    AFTER INSERT ON post
    FOR EACH ROW
EXECUTE FUNCTION post_count_update();
