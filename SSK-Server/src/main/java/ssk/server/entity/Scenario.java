package ssk.server.entity;


import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.envers.Audited;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.UUID;


@Entity
@Audited
@FieldDefaults(level= AccessLevel.PRIVATE)
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString(of= {"title","status","author"})
public class Scenario implements Serializable {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	UUID id;
	
	@Column(unique = true)
	String title;
	
	String status;
	
	@Basic(fetch = FetchType.LAZY)
	@Lob
	String teiContent;
	
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	Author author;
	
	@OneToMany(mappedBy = "scenario")
	List<StepsInScenario> stepsOnPublish;
	
	@OneToMany
	List<Step> steps;
	
	@OneToMany
	List<Author> editors;
	
	@OneToOne
	Author lastEditor; // the editor who lats updated the scenario
	
	@CreationTimestamp
	private LocalDateTime createDateTime;
	
	@UpdateTimestamp
	private LocalDateTime updateDateTime;
	

}
