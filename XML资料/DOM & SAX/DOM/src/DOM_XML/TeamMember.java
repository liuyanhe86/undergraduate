package DOM_XML;

public class TeamMember {
	private String team_name;
	private int team_id;
	private int people_number;
	private String team_member_duty;
	private String name;
	private String sex;
	private int age;
	private String hobby;
	private String job;
	private String company;
	private String email;
	private String tel;
	
	public void setTeamName(String team_name) {
		this.team_name = team_name;
	}
	
	public void setTeamID(int id) {
		this.team_id = id;
	}
	
	public void setPeopleNumber(int number) {
		this.people_number = number;
	}
	
	public void setTeamMemberDuty(String duty) {
		this.team_member_duty = duty;
	}
	
	public void setName(String name) {
		this.name = name;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}
	
	public void setAge(int age) {
		this.age = age;
	}
	
	public void setHobby(String hobby) {
		this.hobby = hobby;
	}
	
	public void setJob(String job) {
		this.job = job;
	}
	
	public void setCompany(String company) {
		this.company = company;
	}
	
	public void setEmail(String email) {
		this.email = email;
	}
	
	public void setTel(String tel) {
		this.tel = tel;
	}
	
	public String getTeamName() {
		return this.team_name;
	}
	
	public int getTeamID() {
		return this.team_id;
	}
	
	public int getPeopleNumber() {
		return this.people_number;
	}
	
	@Override
	public String toString() {
		return "TeamMember: " + this.name + "\n" +
				"duty: " + this.team_member_duty + "\n" +
				"sex: " + this.sex + "\n" +
				"age: " + this.age + "\n" +
				"hobby: " + this.hobby + "\n" +
				"job: " + this.job + "\n" +
				"company: " + this.company + "\n" +
				"email: " + this.email + "\n" +
				"tel: " + this.tel + "\n";
	}

}
