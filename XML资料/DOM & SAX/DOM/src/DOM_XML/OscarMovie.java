package DOM_XML;

public class OscarMovie {
	private int year;
	private String name;
	private double rating;
	private String star;
	private String Opening_Weekend_USA;
	
	public void setYear(int year) {
		this.year = year;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public void setRating(double rating) {
		this.rating = rating;
	}
	
	public void setStar(String star) {
		this.star = star;
	}
	
	public void setOpening(String opening) {
		this.Opening_Weekend_USA = opening;
	}
	
	public int getYear() {
		return year;
	}
	
	public String getName() {
		return name;
	}
	
	public double getRating() {
		return rating;
	}
	
	public String getStar() {
		return star;
	}
	
	public String getOpening() {
		return Opening_Weekend_USA;
	}
	
	@Override
	public String toString() {
		return "OscarMovie: " + this.name + "\n" +
				"Year: " + this.year + "\n" +
				"Rating: " + this.rating + "\n" +
				"Star: " + this.star + "\n" +
				"Opening_Weekend_USA: $" + this.Opening_Weekend_USA + "\n";
	}
}
