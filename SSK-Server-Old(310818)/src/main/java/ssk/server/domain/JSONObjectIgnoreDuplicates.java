
package ssk.server.domain;
import org.json.*;





import org.json.JSONException;
import org.json.JSONObject;

public class JSONObjectIgnoreDuplicates extends JSONObject {

    public JSONObjectIgnoreDuplicates(String json) {
        super(json);
    }

    public JSONObject putOnce(String key, Object value)
            throws JSONException {
        Object storedValue;
        if (key != null && value != null) {
            if ((storedValue = this.opt(key)) != null) {
                if (!storedValue.equals(value)) //Only through Exception for different values with same key
                    throw new JSONException("Duplicate key \"" + key + "\"");
                else
                    return this;
            }
            this.put(key, value);
        }
        return this;
    }
}

