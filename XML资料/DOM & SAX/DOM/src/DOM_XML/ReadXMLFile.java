package DOM_XML;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
 
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
 
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

public class ReadXMLFile {
	public static List<TeamMember> readXMLFile(File file) {
		List<TeamMember> members = new ArrayList<TeamMember>();
		try {
			DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
			DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
			
			// 获取team_members之外的
			Document doc = dBuilder.parse(file);
			String teamName = doc.getElementsByTagName("team_name").item(0).getTextContent();
			int teamID = Integer.parseInt(doc.getElementsByTagName("team_id").item(0).getTextContent());
			int peopleNumber = Integer.parseInt(doc.getElementsByTagName("people_number").item(0).getTextContent());
			
			// 设置team_members之内的
			NodeList memberList = doc.getElementsByTagName("team_member");
			for (int i = 0; i < memberList.getLength(); i++) {
				Node memberNode = memberList.item(i);
				if (memberNode.getNodeType() == Node.ELEMENT_NODE) {
					// 设置一些其他的
					Element memberElement = (Element) memberNode;
					
					TeamMember member = new TeamMember();
					member.setTeamName(teamName);
					member.setTeamID(teamID);
					member.setPeopleNumber(peopleNumber);
					
					// 设置里面的了
					// duty
					String duty = memberElement.getAttribute("duty");
					member.setTeamMemberDuty(duty);
					
					// name
					String name = memberElement.getElementsByTagName("name").item(0).getTextContent();
					member.setName(name);
					
					// sex
					String sex = ((Element)memberElement.getElementsByTagName("sex").item(0)).getAttribute("value");
					member.setSex(sex);
					
					// age
					int age = Integer.parseInt(memberElement.getElementsByTagName("age").item(0).getTextContent());
					member.setAge(age);
					
					// hobby
					NodeList hobbyList = memberElement.getElementsByTagName("hobby");
					String hobby = "";
					for (int j = 0; j < hobbyList.getLength(); j++) {
						hobby = hobby + hobbyList.item(j).getTextContent() + "/";
					}
					hobby = hobby.substring(0, hobby.length() - 1);
					member.setHobby(hobby);
					
					// job
					String job = memberElement.getElementsByTagName("job").item(0).getTextContent();
					member.setJob(job);
					
					// company
					String company = memberElement.getElementsByTagName("company").item(0).getTextContent();
					member.setCompany(company);
					
					// email
					String email = memberElement.getElementsByTagName("email").item(0).getTextContent();
					member.setEmail(email);
					
					// tel
					String tel = memberElement.getElementsByTagName("tel").item(0).getTextContent();
					member.setTel(tel);

					members.add(member);
				}
 
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return members;
	}
	
	public static void main(String[] args) {
		File file = new File("src/DOM_XML/team.xml");
		List<TeamMember> members = readXMLFile(file);
		for (TeamMember member : members) {
			System.out.println(member);
		}
	}
}
