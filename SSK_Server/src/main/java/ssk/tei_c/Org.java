//
// Ce fichier a été généré par l'implémentation de référence JavaTM Architecture for XML Binding (JAXB), v2.2.8-b130911.1802 
// Voir <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Toute modification apportée à ce fichier sera perdue lors de la recompilation du schéma source. 
// Généré le : 2017.09.27 à 04:05:22 PM CEST 
//


package ssk.tei_c;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.JAXBElement;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementRef;
import javax.xml.bind.annotation.XmlElementRefs;
import javax.xml.bind.annotation.XmlElements;
import javax.xml.bind.annotation.XmlID;
import javax.xml.bind.annotation.XmlSchemaType;
import javax.xml.bind.annotation.XmlType;
import javax.xml.bind.annotation.adapters.CollapsedStringAdapter;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;


/**
 * <p>Classe Java pour anonymous complex type.
 * 
 * <p>Le fragment de schéma suivant indique le contenu attendu figurant dans cette classe.
 * 
 * <pre>
 * &lt;complexType>
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;group ref="{http://www.tei-c.org/ns/1.0}tei_model.headLike" maxOccurs="unbounded" minOccurs="0"/>
 *         &lt;choice>
 *           &lt;group ref="{http://www.tei-c.org/ns/1.0}tei_model.pLike" maxOccurs="unbounded" minOccurs="0"/>
 *           &lt;choice maxOccurs="unbounded" minOccurs="0">
 *             &lt;group ref="{http://www.tei-c.org/ns/1.0}tei_model.labelLike"/>
 *             &lt;group ref="{http://www.tei-c.org/ns/1.0}tei_model.nameLike"/>
 *             &lt;element ref="{http://www.tei-c.org/ns/1.0}tei_model.placeLike"/>
 *             &lt;group ref="{http://www.tei-c.org/ns/1.0}tei_model.orgPart"/>
 *             &lt;element ref="{http://www.tei-c.org/ns/1.0}tei_model.milestoneLike"/>
 *           &lt;/choice>
 *         &lt;/choice>
 *         &lt;choice maxOccurs="unbounded" minOccurs="0">
 *           &lt;group ref="{http://www.tei-c.org/ns/1.0}tei_model.noteLike"/>
 *           &lt;group ref="{http://www.tei-c.org/ns/1.0}tei_model.biblLike"/>
 *           &lt;element ref="{http://www.tei-c.org/ns/1.0}linkGrp"/>
 *           &lt;element ref="{http://www.tei-c.org/ns/1.0}link"/>
 *         &lt;/choice>
 *         &lt;element ref="{http://www.tei-c.org/ns/1.0}tei_model.personLike" maxOccurs="unbounded" minOccurs="0"/>
 *       &lt;/sequence>
 *       &lt;attGroup ref="{http://www.tei-c.org/ns/1.0}tei_att.global.attributes"/>
 *       &lt;attGroup ref="{http://www.tei-c.org/ns/1.0}tei_att.typed.attributes"/>
 *       &lt;attGroup ref="{http://www.tei-c.org/ns/1.0}tei_att.sortable.attributes"/>
 *       &lt;attGroup ref="{http://www.tei-c.org/ns/1.0}tei_att.editLike.attributes"/>
 *       &lt;attribute name="role">
 *         &lt;simpleType>
 *           &lt;restriction>
 *             &lt;simpleType>
 *               &lt;list>
 *                 &lt;simpleType>
 *                   &lt;restriction base="{http://www.w3.org/2001/XMLSchema}token">
 *                     &lt;pattern value="(\p{L}|\p{N}|\p{P}|\p{S})+"/>
 *                   &lt;/restriction>
 *                 &lt;/simpleType>
 *               &lt;/list>
 *             &lt;/simpleType>
 *             &lt;minLength value="1"/>
 *           &lt;/restriction>
 *         &lt;/simpleType>
 *       &lt;/attribute>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
    "heads",
    "descsAndLabelsAndNames",
    "psAndAbs",
    "notesAndBiblsAndBiblStructs",
    "teiModelPersonLikes"
})
public class Org implements Serializable
{

    private final static long serialVersionUID = 1L;
    @XmlElement(name = "head")
    protected List<Head> heads;
    @XmlElementRefs({
        @XmlElementRef(name = "desc", namespace = "http://www.tei-c.org/ns/1.0", type = Desc.class, required = false),
        @XmlElementRef(name = "settlement", namespace = "http://www.tei-c.org/ns/1.0", type = Settlement.class, required = false),
        @XmlElementRef(name = "listPerson", namespace = "http://www.tei-c.org/ns/1.0", type = ListPerson.class, required = false),
        @XmlElementRef(name = "listPlace", namespace = "http://www.tei-c.org/ns/1.0", type = ListPlace.class, required = false),
        @XmlElementRef(name = "bloc", namespace = "http://www.tei-c.org/ns/1.0", type = Bloc.class, required = false),
        @XmlElementRef(name = "region", namespace = "http://www.tei-c.org/ns/1.0", type = Region.class, required = false),
        @XmlElementRef(name = "tei_model.milestoneLike", namespace = "http://www.tei-c.org/ns/1.0", type = JAXBElement.class, required = false),
        @XmlElementRef(name = "idno", namespace = "http://www.tei-c.org/ns/1.0", type = Idno.class, required = false),
        @XmlElementRef(name = "listEvent", namespace = "http://www.tei-c.org/ns/1.0", type = ListEvent.class, required = false),
        @XmlElementRef(name = "event", namespace = "http://www.tei-c.org/ns/1.0", type = Event.class, required = false),
        @XmlElementRef(name = "country", namespace = "http://www.tei-c.org/ns/1.0", type = Country.class, required = false),
        @XmlElementRef(name = "geogName", namespace = "http://www.tei-c.org/ns/1.0", type = GeogName.class, required = false),
        @XmlElementRef(name = "name", namespace = "http://www.tei-c.org/ns/1.0", type = Name.class, required = false),
        @XmlElementRef(name = "location", namespace = "http://www.tei-c.org/ns/1.0", type = Location.class, required = false),
        @XmlElementRef(name = "geogFeat", namespace = "http://www.tei-c.org/ns/1.0", type = GeogFeat.class, required = false),
        @XmlElementRef(name = "district", namespace = "http://www.tei-c.org/ns/1.0", type = District.class, required = false),
        @XmlElementRef(name = "roleName", namespace = "http://www.tei-c.org/ns/1.0", type = RoleName.class, required = false),
        @XmlElementRef(name = "trait", namespace = "http://www.tei-c.org/ns/1.0", type = Trait.class, required = false),
        @XmlElementRef(name = "forename", namespace = "http://www.tei-c.org/ns/1.0", type = Forename.class, required = false),
        @XmlElementRef(name = "genName", namespace = "http://www.tei-c.org/ns/1.0", type = GenName.class, required = false),
        @XmlElementRef(name = "nameLink", namespace = "http://www.tei-c.org/ns/1.0", type = NameLink.class, required = false),
        @XmlElementRef(name = "tei_model.placeLike", namespace = "http://www.tei-c.org/ns/1.0", type = JAXBElement.class, required = false),
        @XmlElementRef(name = "rs", namespace = "http://www.tei-c.org/ns/1.0", type = Rs.class, required = false),
        @XmlElementRef(name = "population", namespace = "http://www.tei-c.org/ns/1.0", type = Population.class, required = false),
        @XmlElementRef(name = "placeName", namespace = "http://www.tei-c.org/ns/1.0", type = PlaceName.class, required = false),
        @XmlElementRef(name = "listOrg", namespace = "http://www.tei-c.org/ns/1.0", type = ListOrg.class, required = false),
        @XmlElementRef(name = "orgName", namespace = "http://www.tei-c.org/ns/1.0", type = OrgName.class, required = false),
        @XmlElementRef(name = "persName", namespace = "http://www.tei-c.org/ns/1.0", type = PersName.class, required = false),
        @XmlElementRef(name = "offset", namespace = "http://www.tei-c.org/ns/1.0", type = Offset.class, required = false),
        @XmlElementRef(name = "climate", namespace = "http://www.tei-c.org/ns/1.0", type = Climate.class, required = false),
        @XmlElementRef(name = "surname", namespace = "http://www.tei-c.org/ns/1.0", type = Surname.class, required = false),
        @XmlElementRef(name = "label", namespace = "http://www.tei-c.org/ns/1.0", type = Label.class, required = false),
        @XmlElementRef(name = "state", namespace = "http://www.tei-c.org/ns/1.0", type = State.class, required = false),
        @XmlElementRef(name = "addName", namespace = "http://www.tei-c.org/ns/1.0", type = AddName.class, required = false),
        @XmlElementRef(name = "terrain", namespace = "http://www.tei-c.org/ns/1.0", type = Terrain.class, required = false)
    })
    protected List<Serializable> descsAndLabelsAndNames;
    @XmlElements({
        @XmlElement(name = "p", type = P.class),
        @XmlElement(name = "ab", type = Ab.class)
    })
    protected List<TeiMacroParaContent> psAndAbs;
    @XmlElements({
        @XmlElement(name = "note", type = Note.class),
        @XmlElement(name = "bibl", type = Bibl.class),
        @XmlElement(name = "biblStruct", type = BiblStruct.class),
        @XmlElement(name = "listBibl", type = ListBibl.class),
        @XmlElement(name = "biblFull", type = BiblFull.class),
        @XmlElement(name = "linkGrp", type = LinkGrp.class),
        @XmlElement(name = "link", type = Link.class)
    })
    protected List<Serializable> notesAndBiblsAndBiblStructs;
    @XmlElementRef(name = "tei_model.personLike", namespace = "http://www.tei-c.org/ns/1.0", type = JAXBElement.class, required = false)
    protected List<JAXBElement<?>> teiModelPersonLikes;
    @XmlAttribute(name = "role")
    protected List<String> roles;
    @XmlAttribute(name = "source")
    protected List<String> sources;
    @XmlAttribute(name = "n")
    protected String n;
    @XmlAttribute(name = "copyOf")
    @XmlSchemaType(name = "anyURI")
    protected String copyOf;
    @XmlAttribute(name = "synch")
    protected List<String> synches;
    @XmlAttribute(name = "prev")
    @XmlSchemaType(name = "anyURI")
    protected String prev;
    @XmlAttribute(name = "next")
    @XmlSchemaType(name = "anyURI")
    protected String next;
    @XmlAttribute(name = "sameAs")
    @XmlSchemaType(name = "anyURI")
    protected String sameAs;
    @XmlAttribute(name = "select")
    protected List<String> selects;
    @XmlAttribute(name = "corresp")
    protected List<String> corresps;
    @XmlAttribute(name = "exclude")
    protected List<String> excludes;
    @XmlAttribute(name = "id", namespace = "http://www.w3.org/XML/1998/namespace")
    @XmlJavaTypeAdapter(CollapsedStringAdapter.class)
    @XmlID
    @XmlSchemaType(name = "ID")
    protected String id;
    @XmlAttribute(name = "rend")
    protected List<String> rends;
    @XmlAttribute(name = "style")
    protected String style;
    @XmlAttribute(name = "rendition")
    protected List<String> rendering;
    @XmlAttribute(name = "lang", namespace = "http://www.w3.org/XML/1998/namespace")
    protected String lang;
    @XmlAttribute(name = "base", namespace = "http://www.w3.org/XML/1998/namespace")
    @XmlSchemaType(name = "anyURI")
    protected String base;
    @XmlAttribute(name = "resp")
    protected List<String> resps;
    @XmlAttribute(name = "cert")
    protected String cert;
    @XmlAttribute(name = "space", namespace = "http://www.w3.org/XML/1998/namespace")
    @XmlJavaTypeAdapter(CollapsedStringAdapter.class)
    protected String space;
    @XmlAttribute(name = "type")
    @XmlJavaTypeAdapter(CollapsedStringAdapter.class)
    protected String type;
    @XmlAttribute(name = "subtype")
    @XmlJavaTypeAdapter(CollapsedStringAdapter.class)
    protected String subtype;
    @XmlAttribute(name = "sortKey")
    @XmlJavaTypeAdapter(CollapsedStringAdapter.class)
    protected String sortKey;
    @XmlAttribute(name = "evidence")
    protected List<String> evidences;
    @XmlAttribute(name = "quantity")
    protected String quantity;
    @XmlAttribute(name = "precision")
    @XmlJavaTypeAdapter(CollapsedStringAdapter.class)
    protected String precision;
    @XmlAttribute(name = "scope")
    @XmlJavaTypeAdapter(CollapsedStringAdapter.class)
    protected String scope;
    @XmlAttribute(name = "extent")
    protected String extent;
    @XmlAttribute(name = "unit")
    protected String unit;
    @XmlAttribute(name = "max")
    protected String max;
    @XmlAttribute(name = "min")
    protected String min;
    @XmlAttribute(name = "confidence")
    protected Double confidence;
    @XmlAttribute(name = "atMost")
    protected String atMost;
    @XmlAttribute(name = "atLeast")
    protected String atLeast;
    @XmlAttribute(name = "instant")
    protected String instant;

    /**
     * Gets the value of the heads property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the heads property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getHeads().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link Head }
     * 
     * 
     */
    public List<Head> getHeads() {
        if (heads == null) {
            heads = new ArrayList<Head>();
        }
        return this.heads;
    }

    /**
     * Gets the value of the descsAndLabelsAndNames property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the descsAndLabelsAndNames property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getDescsAndLabelsAndNames().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link Desc }
     * {@link Settlement }
     * {@link ListPerson }
     * {@link ListPlace }
     * {@link JAXBElement }{@code <}{@link TeiModelPlaceLike }{@code >}
     * {@link Bloc }
     * {@link Region }
     * {@link JAXBElement }{@code <}{@link Object }{@code >}
     * {@link Idno }
     * {@link ListEvent }
     * {@link Event }
     * {@link Country }
     * {@link GeogName }
     * {@link Name }
     * {@link Location }
     * {@link GeogFeat }
     * {@link District }
     * {@link RoleName }
     * {@link Trait }
     * {@link Forename }
     * {@link GenName }
     * {@link NameLink }
     * {@link JAXBElement }{@code <}{@link TeiModelPlaceLike }{@code >}
     * {@link Rs }
     * {@link Population }
     * {@link JAXBElement }{@code <}{@link Milestone }{@code >}
     * {@link PlaceName }
     * {@link ListOrg }
     * {@link OrgName }
     * {@link PersName }
     * {@link JAXBElement }{@code <}{@link Gb }{@code >}
     * {@link Offset }
     * {@link JAXBElement }{@code <}{@link Pb }{@code >}
     * {@link Climate }
     * {@link Surname }
     * {@link JAXBElement }{@code <}{@link Lb }{@code >}
     * {@link Label }
     * {@link JAXBElement }{@code <}{@link Cb }{@code >}
     * {@link JAXBElement }{@code <}{@link Anchor }{@code >}
     * {@link State }
     * {@link AddName }
     * {@link Terrain }
     * 
     * 
     */
    public List<Serializable> getDescsAndLabelsAndNames() {
        if (descsAndLabelsAndNames == null) {
            descsAndLabelsAndNames = new ArrayList<Serializable>();
        }
        return this.descsAndLabelsAndNames;
    }

    /**
     * Gets the value of the psAndAbs property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the psAndAbs property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getPSAndAbs().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link P }
     * {@link Ab }
     * 
     * 
     */
    public List<TeiMacroParaContent> getPSAndAbs() {
        if (psAndAbs == null) {
            psAndAbs = new ArrayList<TeiMacroParaContent>();
        }
        return this.psAndAbs;
    }

    /**
     * Gets the value of the notesAndBiblsAndBiblStructs property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the notesAndBiblsAndBiblStructs property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getNotesAndBiblsAndBiblStructs().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link Note }
     * {@link Bibl }
     * {@link BiblStruct }
     * {@link ListBibl }
     * {@link BiblFull }
     * {@link LinkGrp }
     * {@link Link }
     * 
     * 
     */
    public List<Serializable> getNotesAndBiblsAndBiblStructs() {
        if (notesAndBiblsAndBiblStructs == null) {
            notesAndBiblsAndBiblStructs = new ArrayList<Serializable>();
        }
        return this.notesAndBiblsAndBiblStructs;
    }

    /**
     * Gets the value of the teiModelPersonLikes property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the teiModelPersonLikes property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getTeiModelPersonLikes().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link JAXBElement }{@code <}{@link Org }{@code >}
     * {@link JAXBElement }{@code <}{@link Person }{@code >}
     * {@link JAXBElement }{@code <}{@link Object }{@code >}
     * {@link JAXBElement }{@code <}{@link PersonGrp }{@code >}
     * 
     * 
     */
    public List<JAXBElement<?>> getTeiModelPersonLikes() {
        if (teiModelPersonLikes == null) {
            teiModelPersonLikes = new ArrayList<JAXBElement<?>>();
        }
        return this.teiModelPersonLikes;
    }

    /**
     * Gets the value of the roles property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the roles property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getRoles().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link String }
     * 
     * 
     */
    public List<String> getRoles() {
        if (roles == null) {
            roles = new ArrayList<String>();
        }
        return this.roles;
    }

    /**
     * Gets the value of the sources property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the sources property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getSources().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link String }
     * 
     * 
     */
    public List<String> getSources() {
        if (sources == null) {
            sources = new ArrayList<String>();
        }
        return this.sources;
    }

    /**
     * Obtient la valeur de la propriété n.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getN() {
        return n;
    }

    /**
     * Définit la valeur de la propriété n.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setN(String value) {
        this.n = value;
    }

    /**
     * Obtient la valeur de la propriété copyOf.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCopyOf() {
        return copyOf;
    }

    /**
     * Définit la valeur de la propriété copyOf.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCopyOf(String value) {
        this.copyOf = value;
    }

    /**
     * Gets the value of the synches property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the synches property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getSynches().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link String }
     * 
     * 
     */
    public List<String> getSynches() {
        if (synches == null) {
            synches = new ArrayList<String>();
        }
        return this.synches;
    }

    /**
     * Obtient la valeur de la propriété prev.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getPrev() {
        return prev;
    }

    /**
     * Définit la valeur de la propriété prev.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setPrev(String value) {
        this.prev = value;
    }

    /**
     * Obtient la valeur de la propriété next.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getNext() {
        return next;
    }

    /**
     * Définit la valeur de la propriété next.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setNext(String value) {
        this.next = value;
    }

    /**
     * Obtient la valeur de la propriété sameAs.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getSameAs() {
        return sameAs;
    }

    /**
     * Définit la valeur de la propriété sameAs.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setSameAs(String value) {
        this.sameAs = value;
    }

    /**
     * Gets the value of the selects property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the selects property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getSelects().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link String }
     * 
     * 
     */
    public List<String> getSelects() {
        if (selects == null) {
            selects = new ArrayList<String>();
        }
        return this.selects;
    }

    /**
     * Gets the value of the corresps property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the corresps property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getCorresps().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link String }
     * 
     * 
     */
    public List<String> getCorresps() {
        if (corresps == null) {
            corresps = new ArrayList<String>();
        }
        return this.corresps;
    }

    /**
     * Gets the value of the excludes property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the excludes property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getExcludes().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link String }
     * 
     * 
     */
    public List<String> getExcludes() {
        if (excludes == null) {
            excludes = new ArrayList<String>();
        }
        return this.excludes;
    }

    /**
     * Obtient la valeur de la propriété id.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getId() {
        return id;
    }

    /**
     * Définit la valeur de la propriété id.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setId(String value) {
        this.id = value;
    }

    /**
     * Gets the value of the rends property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the rends property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getRends().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link String }
     * 
     * 
     */
    public List<String> getRends() {
        if (rends == null) {
            rends = new ArrayList<String>();
        }
        return this.rends;
    }

    /**
     * Obtient la valeur de la propriété style.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getStyle() {
        return style;
    }

    /**
     * Définit la valeur de la propriété style.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setStyle(String value) {
        this.style = value;
    }

    /**
     * Gets the value of the rendering property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the rendering property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getRendering().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link String }
     * 
     * 
     */
    public List<String> getRendering() {
        if (rendering == null) {
            rendering = new ArrayList<String>();
        }
        return this.rendering;
    }

    /**
     * Obtient la valeur de la propriété lang.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getLang() {
        return lang;
    }

    /**
     * Définit la valeur de la propriété lang.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setLang(String value) {
        this.lang = value;
    }

    /**
     * Obtient la valeur de la propriété base.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getBase() {
        return base;
    }

    /**
     * Définit la valeur de la propriété base.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setBase(String value) {
        this.base = value;
    }

    /**
     * Gets the value of the resps property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the resps property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getResps().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link String }
     * 
     * 
     */
    public List<String> getResps() {
        if (resps == null) {
            resps = new ArrayList<String>();
        }
        return this.resps;
    }

    /**
     * Obtient la valeur de la propriété cert.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCert() {
        return cert;
    }

    /**
     * Définit la valeur de la propriété cert.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCert(String value) {
        this.cert = value;
    }

    /**
     * Obtient la valeur de la propriété space.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getSpace() {
        return space;
    }

    /**
     * Définit la valeur de la propriété space.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setSpace(String value) {
        this.space = value;
    }

    /**
     * Obtient la valeur de la propriété type.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getType() {
        return type;
    }

    /**
     * Définit la valeur de la propriété type.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setType(String value) {
        this.type = value;
    }

    /**
     * Obtient la valeur de la propriété subtype.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getSubtype() {
        return subtype;
    }

    /**
     * Définit la valeur de la propriété subtype.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setSubtype(String value) {
        this.subtype = value;
    }

    /**
     * Obtient la valeur de la propriété sortKey.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getSortKey() {
        return sortKey;
    }

    /**
     * Définit la valeur de la propriété sortKey.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setSortKey(String value) {
        this.sortKey = value;
    }

    /**
     * Gets the value of the evidences property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the evidences property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getEvidences().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link String }
     * 
     * 
     */
    public List<String> getEvidences() {
        if (evidences == null) {
            evidences = new ArrayList<String>();
        }
        return this.evidences;
    }

    /**
     * Obtient la valeur de la propriété quantity.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getQuantity() {
        return quantity;
    }

    /**
     * Définit la valeur de la propriété quantity.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setQuantity(String value) {
        this.quantity = value;
    }

    /**
     * Obtient la valeur de la propriété precision.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getPrecision() {
        return precision;
    }

    /**
     * Définit la valeur de la propriété precision.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setPrecision(String value) {
        this.precision = value;
    }

    /**
     * Obtient la valeur de la propriété scope.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getScope() {
        return scope;
    }

    /**
     * Définit la valeur de la propriété scope.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setScope(String value) {
        this.scope = value;
    }

    /**
     * Obtient la valeur de la propriété extent.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getExtent() {
        return extent;
    }

    /**
     * Définit la valeur de la propriété extent.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setExtent(String value) {
        this.extent = value;
    }

    /**
     * Obtient la valeur de la propriété unit.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getUnit() {
        return unit;
    }

    /**
     * Définit la valeur de la propriété unit.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setUnit(String value) {
        this.unit = value;
    }

    /**
     * Obtient la valeur de la propriété max.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getMax() {
        return max;
    }

    /**
     * Définit la valeur de la propriété max.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setMax(String value) {
        this.max = value;
    }

    /**
     * Obtient la valeur de la propriété min.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getMin() {
        return min;
    }

    /**
     * Définit la valeur de la propriété min.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setMin(String value) {
        this.min = value;
    }

    /**
     * Obtient la valeur de la propriété confidence.
     * 
     * @return
     *     possible object is
     *     {@link Double }
     *     
     */
    public Double getConfidence() {
        return confidence;
    }

    /**
     * Définit la valeur de la propriété confidence.
     * 
     * @param value
     *     allowed object is
     *     {@link Double }
     *     
     */
    public void setConfidence(Double value) {
        this.confidence = value;
    }

    /**
     * Obtient la valeur de la propriété atMost.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getAtMost() {
        return atMost;
    }

    /**
     * Définit la valeur de la propriété atMost.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setAtMost(String value) {
        this.atMost = value;
    }

    /**
     * Obtient la valeur de la propriété atLeast.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getAtLeast() {
        return atLeast;
    }

    /**
     * Définit la valeur de la propriété atLeast.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setAtLeast(String value) {
        this.atLeast = value;
    }

    /**
     * Obtient la valeur de la propriété instant.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getInstant() {
        if (instant == null) {
            return "false";
        } else {
            return instant;
        }
    }

    /**
     * Définit la valeur de la propriété instant.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setInstant(String value) {
        this.instant = value;
    }

}
