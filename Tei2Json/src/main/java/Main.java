import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.List;
import java.util.Scanner;


import org.json.JSONObject;
import org.json.XML;

public class Main
{


  public static void main(String[] args) throws Exception
    {

        JSONObject xmlJSONObj = XML.toJSONObject(new Main().getFile("scenarios/SSK_sc_schemaCustomization.xml"));

        try (FileWriter file = new FileWriter("/Users/ltadonfo/result.json")) {
            file.write(xmlJSONObj.toString());
            System.out.println("Successfully Copied JSON Object to File...");
            System.out.println("\nJSON Object: " + xmlJSONObj);
        }
    }

      private String getFile(String fileName) {

        StringBuilder result = new StringBuilder("");

        //Get file from resources folder
        ClassLoader classLoader = getClass().getClassLoader();
        File file = new File(classLoader.getResource(fileName).getFile());
        try (Scanner scanner = new Scanner(file)) {

            while (scanner.hasNextLine()) {
                String line = scanner.nextLine();
                result.append(line).append("\n");
            }
            scanner.close();

        } catch (IOException e) {
            e.printStackTrace();
        }

        return result.toString();

    }


}