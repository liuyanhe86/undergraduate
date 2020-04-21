import java.time.Duration;
import java.time.Year;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
public class Movie {
	private String name;
	private String id;
	private Year year;
	private String intro;
	private String country;
	private List<String> directors;
	private List<String> writers;
	private List<String> stars;
	private List<String> genres;
	private Duration duration;
	private String level;
	private Long box;
	
	public boolean meet(Map<String, String> attrs) {
		// TODO Auto-generated method stub
		if(attrs.isEmpty())
			return false;
		boolean flag = true;
		for(String k : attrs.keySet()) {
			String v = attrs.get(k);
			k = k.toLowerCase();
			switch(k) {
			case "name":
				flag = flag && name.equals(v);
				break;
			case "id":
				flag = flag && id.equals(v);
				break;
			case "year":
				String[] bounds = v.split("-");
				if(bounds.length == 1 && !v.contains("-"))
					flag = flag && year.toString().equals(v);
				else if(bounds.length == 1 && v.contains("-"))
					flag = flag && !year.isBefore(Year.parse(bounds[0]));
				else if(bounds.length == 2)
					if(bounds[0].equals(""))
						flag = flag && year.isBefore(Year.parse(bounds[1]));
					else
						flag = flag && (!year.isBefore(Year.parse(bounds[0])) && year.isBefore(Year.parse(bounds[1])));
				else
					flag = false;
				break;
			case "intro":
				flag = flag && intro.equals(v);
				break;
			case "country":
				flag = flag && country.equals(v);
				break;
			case "duration":
				bounds = v.split("-");
				if(bounds.length == 1 && !v.contains("-"))
					flag = flag && duration.equals(Duration.parse(bounds[0]));
				else if(bounds.length == 1 && v.contains("-"))
					flag = flag && (duration.compareTo(Duration.parse(bounds[0])) >= 0);
				else if(bounds.length == 2)
					if(bounds[0].equals(""))
						flag = flag && (duration.compareTo(Duration.parse(bounds[1])) >= 0);
					else
						flag = flag && (duration.compareTo(Duration.parse(bounds[0])) >= 0 
										&& duration.compareTo(Duration.parse(bounds[1])) < 0);
				else
					flag = false;
				break;
			case "level":
				flag = flag && level.equals(v);
				break;
			case "box":
				bounds = v.split("-");
				if(bounds.length == 1 && !v.contains("-"))
					flag = flag && box.toString().equals(v);
				else if(bounds.length == 1 && v.contains("-"))
					flag = flag && (box >= Long.parseLong(bounds[0]));
				else if(bounds.length == 2)
					if(bounds[0].equals(""))
						flag = flag && (box < Long.parseLong(bounds[1]));
					else
						flag = flag && (box >= Long.parseLong(bounds[0]) && box < Long.parseLong(bounds[1]));
				else
					flag = false;
				break;
			case "directors":
				flag = flag && directors.containsAll(Arrays.asList(v.split(",")));
				break;
			case "writers":
				flag = flag && writers.containsAll(Arrays.asList(v.split(",")));
				break;
			case "stars":
				flag = flag && stars.containsAll(Arrays.asList(v.split(",")));
				break;
			case "genres":
				flag = flag && genres.containsAll(Arrays.asList(v.split(",")));
				break;
			default:
				flag = false;
				break;
			}
		}
		return flag;
	}
	
	@Override
    public String toString() {
        return name + "{" +
                "id=" + id +
                ", year=" + year + 
                ", country=" + country + 
                ", level=" + level + 
                ", box=" + box + 
                ", duration=" + duration + 
                '}';
    }
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public Year getYear() {
		return year;
	}
	public void setYear(Year year) {
		this.year = year;
	}
	public String getIntro() {
		return intro;
	}
	public void setIntro(String intro) {
		this.intro = intro;
	}
	public String getCountry() {
		return country;
	}
	public void setCountry(String country) {
		this.country = country;
	}
	public List<String> getDirectors() {
		return directors;
	}
	public void setDirectors(List<String> directors) {
		this.directors = directors;
	}
	public List<String> getWriters() {
		return writers;
	}
	public void setWriters(List<String> writers) {
		this.writers = writers;
	}
	public List<String> getStars() {
		return stars;
	}
	public void setStars(List<String> stars) {
		this.stars = stars;
	}
	public List<String> getGenres() {
		return genres;
	}
	public void setGenres(List<String> genres) {
		this.genres = genres;
	}
	public Duration getDuration() {
		return duration;
	}
	public void setDuration(Duration duration) {
		this.duration = duration;
	}
	public String getLevel() {
		return level;
	}
	public void setLevel(String level) {
		this.level = level;
	}
	public Long getBox() {
		return box;
	}
	public void setBox(Long box) {
		this.box = box;
	}

}
