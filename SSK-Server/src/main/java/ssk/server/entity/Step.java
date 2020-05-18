package ssk.server.entity;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.envers.Audited;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Set;
import java.util.UUID;


@Entity
@Audited
@FieldDefaults(level= AccessLevel.PRIVATE)
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString(of= {"title","author"})
public class Step  implements Serializable {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	UUID id;
	
	String title;
	
	@Basic(fetch = FetchType.LAZY)
	@Lob
	String teiContent;
	
	
	@OneToMany(mappedBy = "step")
	Set<StepsInScenario> scenarios;
	
	int position;
	
	@OneToOne
	Step fromStep;
	
	
	@JoinTable(
			name = "resources_in_step",
			joinColumns = @JoinColumn(name = "step_id"),
			inverseJoinColumns = @JoinColumn(name = "resource_id"))
	@ManyToMany
	Set<Resource> resources;
	
	@OneToOne
	Author lastEditor; // the editor who lats updated the scenario
	
	@CreationTimestamp
	private LocalDateTime createDateTime;
	
	@UpdateTimestamp
	private LocalDateTime updateDateTime;
}
