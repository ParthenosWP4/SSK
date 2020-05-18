package ssk.server.entity;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.CreationTimestamp;
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
@ToString(of= {"id","title"})
public class Resource implements Serializable {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	UUID id;
	
	@Column(unique = true, nullable = false)
	String title;
	
	String jsonContent;
	
	@ManyToMany(mappedBy = "resources")
	Set<Step> steps;
	
	
	
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	Author fetchBy;
	
	@CreationTimestamp
	private LocalDateTime createDateTime;
	
	
	
}
