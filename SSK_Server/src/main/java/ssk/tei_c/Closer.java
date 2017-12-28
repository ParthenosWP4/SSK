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
import javax.xml.bind.annotation.XmlElementRef;
import javax.xml.bind.annotation.XmlElementRefs;
import javax.xml.bind.annotation.XmlID;
import javax.xml.bind.annotation.XmlMixed;
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
 *       &lt;choice maxOccurs="unbounded" minOccurs="0">
 *         &lt;element ref="{http://www.tei-c.org/ns/1.0}signed"/>
 *         &lt;element ref="{http://www.tei-c.org/ns/1.0}dateline"/>
 *         &lt;element ref="{http://www.tei-c.org/ns/1.0}salute"/>
 *         &lt;group ref="{http://www.tei-c.org/ns/1.0}tei_model.phrase"/>
 *         &lt;group ref="{http://www.tei-c.org/ns/1.0}tei_model.global"/>
 *       &lt;/choice>
 *       &lt;attGroup ref="{http://www.tei-c.org/ns/1.0}tei_att.global.attributes"/>
 *       &lt;attGroup ref="{http://www.tei-c.org/ns/1.0}tei_att.written.attributes"/>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
    "content"
})
public class Closer
    implements Serializable
{

    private final static long serialVersionUID = 1L;
    @XmlElementRefs({
        @XmlElementRef(name = "dateline", namespace = "http://www.tei-c.org/ns/1.0", type = Dateline.class, required = false),
        @XmlElementRef(name = "tei_model.global.edit", namespace = "http://www.tei-c.org/ns/1.0", type = JAXBElement.class, required = false),
        @XmlElementRef(name = "date", namespace = "http://www.tei-c.org/ns/1.0", type = Date.class, required = false),
        @XmlElementRef(name = "bloc", namespace = "http://www.tei-c.org/ns/1.0", type = Bloc.class, required = false),
        @XmlElementRef(name = "region", namespace = "http://www.tei-c.org/ns/1.0", type = Region.class, required = false),
        @XmlElementRef(name = "add", namespace = "http://www.tei-c.org/ns/1.0", type = Add.class, required = false),
        @XmlElementRef(name = "tei_model.phrase.xml", namespace = "http://www.tei-c.org/ns/1.0", type = JAXBElement.class, required = false),
        @XmlElementRef(name = "country", namespace = "http://www.tei-c.org/ns/1.0", type = Country.class, required = false),
        @XmlElementRef(name = "geogName", namespace = "http://www.tei-c.org/ns/1.0", type = GeogName.class, required = false),
        @XmlElementRef(name = "address", namespace = "http://www.tei-c.org/ns/1.0", type = Address.class, required = false),
        @XmlElementRef(name = "unclear", namespace = "http://www.tei-c.org/ns/1.0", type = Unclear.class, required = false),
        @XmlElementRef(name = "name", namespace = "http://www.tei-c.org/ns/1.0", type = Name.class, required = false),
        @XmlElementRef(name = "salute", namespace = "http://www.tei-c.org/ns/1.0", type = Salute.class, required = false),
        @XmlElementRef(name = "media", namespace = "http://www.tei-c.org/ns/1.0", type = Media.class, required = false),
        @XmlElementRef(name = "location", namespace = "http://www.tei-c.org/ns/1.0", type = Location.class, required = false),
        @XmlElementRef(name = "district", namespace = "http://www.tei-c.org/ns/1.0", type = District.class, required = false),
        @XmlElementRef(name = "measure", namespace = "http://www.tei-c.org/ns/1.0", type = Measure.class, required = false),
        @XmlElementRef(name = "trait", namespace = "http://www.tei-c.org/ns/1.0", type = Trait.class, required = false),
        @XmlElementRef(name = "ident", namespace = "http://www.tei-c.org/ns/1.0", type = Ident.class, required = false),
        @XmlElementRef(name = "binaryObject", namespace = "http://www.tei-c.org/ns/1.0", type = BinaryObject.class, required = false),
        @XmlElementRef(name = "choice", namespace = "http://www.tei-c.org/ns/1.0", type = Choice.class, required = false),
        @XmlElementRef(name = "forename", namespace = "http://www.tei-c.org/ns/1.0", type = Forename.class, required = false),
        @XmlElementRef(name = "genName", namespace = "http://www.tei-c.org/ns/1.0", type = GenName.class, required = false),
        @XmlElementRef(name = "title", namespace = "http://www.tei-c.org/ns/1.0", type = Title.class, required = false),
        @XmlElementRef(name = "reg", namespace = "http://www.tei-c.org/ns/1.0", type = Reg.class, required = false),
        @XmlElementRef(name = "email", namespace = "http://www.tei-c.org/ns/1.0", type = Email.class, required = false),
        @XmlElementRef(name = "affiliation", namespace = "http://www.tei-c.org/ns/1.0", type = Affiliation.class, required = false),
        @XmlElementRef(name = "mentioned", namespace = "http://www.tei-c.org/ns/1.0", type = Mentioned.class, required = false),
        @XmlElementRef(name = "orig", namespace = "http://www.tei-c.org/ns/1.0", type = Orig.class, required = false),
        @XmlElementRef(name = "del", namespace = "http://www.tei-c.org/ns/1.0", type = Del.class, required = false),
        @XmlElementRef(name = "geo", namespace = "http://www.tei-c.org/ns/1.0", type = Geo.class, required = false),
        @XmlElementRef(name = "abbr", namespace = "http://www.tei-c.org/ns/1.0", type = Abbr.class, required = false),
        @XmlElementRef(name = "figure", namespace = "http://www.tei-c.org/ns/1.0", type = Figure.class, required = false),
        @XmlElementRef(name = "persName", namespace = "http://www.tei-c.org/ns/1.0", type = PersName.class, required = false),
        @XmlElementRef(name = "offset", namespace = "http://www.tei-c.org/ns/1.0", type = Offset.class, required = false),
        @XmlElementRef(name = "signed", namespace = "http://www.tei-c.org/ns/1.0", type = JAXBElement.class, required = false),
        @XmlElementRef(name = "state", namespace = "http://www.tei-c.org/ns/1.0", type = State.class, required = false),
        @XmlElementRef(name = "addName", namespace = "http://www.tei-c.org/ns/1.0", type = AddName.class, required = false),
        @XmlElementRef(name = "terrain", namespace = "http://www.tei-c.org/ns/1.0", type = Terrain.class, required = false),
        @XmlElementRef(name = "foreign", namespace = "http://www.tei-c.org/ns/1.0", type = Foreign.class, required = false),
        @XmlElementRef(name = "time", namespace = "http://www.tei-c.org/ns/1.0", type = Time.class, required = false),
        @XmlElementRef(name = "settlement", namespace = "http://www.tei-c.org/ns/1.0", type = Settlement.class, required = false),
        @XmlElementRef(name = "tei_model.milestoneLike", namespace = "http://www.tei-c.org/ns/1.0", type = JAXBElement.class, required = false),
        @XmlElementRef(name = "idno", namespace = "http://www.tei-c.org/ns/1.0", type = Idno.class, required = false),
        @XmlElementRef(name = "emph", namespace = "http://www.tei-c.org/ns/1.0", type = Emph.class, required = false),
        @XmlElementRef(name = "formula", namespace = "http://www.tei-c.org/ns/1.0", type = Formula.class, required = false),
        @XmlElementRef(name = "distinct", namespace = "http://www.tei-c.org/ns/1.0", type = Distinct.class, required = false),
        @XmlElementRef(name = "geogFeat", namespace = "http://www.tei-c.org/ns/1.0", type = GeogFeat.class, required = false),
        @XmlElementRef(name = "tei_model.global.meta", namespace = "http://www.tei-c.org/ns/1.0", type = JAXBElement.class, required = false),
        @XmlElementRef(name = "roleName", namespace = "http://www.tei-c.org/ns/1.0", type = RoleName.class, required = false),
        @XmlElementRef(name = "term", namespace = "http://www.tei-c.org/ns/1.0", type = Term.class, required = false),
        @XmlElementRef(name = "code", namespace = "http://www.tei-c.org/ns/1.0", type = Code.class, required = false),
        @XmlElementRef(name = "nameLink", namespace = "http://www.tei-c.org/ns/1.0", type = NameLink.class, required = false),
        @XmlElementRef(name = "tei_model.specDescLike", namespace = "http://www.tei-c.org/ns/1.0", type = JAXBElement.class, required = false),
        @XmlElementRef(name = "notatedMusic", namespace = "http://www.tei-c.org/ns/1.0", type = NotatedMusic.class, required = false),
        @XmlElementRef(name = "rs", namespace = "http://www.tei-c.org/ns/1.0", type = Rs.class, required = false),
        @XmlElementRef(name = "measureGrp", namespace = "http://www.tei-c.org/ns/1.0", type = MeasureGrp.class, required = false),
        @XmlElementRef(name = "expan", namespace = "http://www.tei-c.org/ns/1.0", type = Expan.class, required = false),
        @XmlElementRef(name = "tei_model.segLike", namespace = "http://www.tei-c.org/ns/1.0", type = JAXBElement.class, required = false),
        @XmlElementRef(name = "hi", namespace = "http://www.tei-c.org/ns/1.0", type = Hi.class, required = false),
        @XmlElementRef(name = "population", namespace = "http://www.tei-c.org/ns/1.0", type = Population.class, required = false),
        @XmlElementRef(name = "placeName", namespace = "http://www.tei-c.org/ns/1.0", type = PlaceName.class, required = false),
        @XmlElementRef(name = "graphic", namespace = "http://www.tei-c.org/ns/1.0", type = Graphic.class, required = false),
        @XmlElementRef(name = "orgName", namespace = "http://www.tei-c.org/ns/1.0", type = OrgName.class, required = false),
        @XmlElementRef(name = "climate", namespace = "http://www.tei-c.org/ns/1.0", type = Climate.class, required = false),
        @XmlElementRef(name = "surname", namespace = "http://www.tei-c.org/ns/1.0", type = Surname.class, required = false),
        @XmlElementRef(name = "soCalled", namespace = "http://www.tei-c.org/ns/1.0", type = SoCalled.class, required = false),
        @XmlElementRef(name = "corr", namespace = "http://www.tei-c.org/ns/1.0", type = Corr.class, required = false),
        @XmlElementRef(name = "tei_model.ptrLike", namespace = "http://www.tei-c.org/ns/1.0", type = JAXBElement.class, required = false),
        @XmlElementRef(name = "note", namespace = "http://www.tei-c.org/ns/1.0", type = Note.class, required = false),
        @XmlElementRef(name = "gloss", namespace = "http://www.tei-c.org/ns/1.0", type = Gloss.class, required = false),
        @XmlElementRef(name = "sic", namespace = "http://www.tei-c.org/ns/1.0", type = Sic.class, required = false),
        @XmlElementRef(name = "num", namespace = "http://www.tei-c.org/ns/1.0", type = Num.class, required = false)
    })
    @XmlMixed
    protected List<Serializable> content;
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
    @XmlAttribute(name = "hand")
    @XmlSchemaType(name = "anyURI")
    protected String hand;

    /**
     * Gets the value of the content property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the content property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getContent().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link Dateline }
     * {@link JAXBElement }{@code <}{@link TeiModelGlobalEdit }{@code >}
     * {@link JAXBElement }{@code <}{@link Att }{@code >}
     * {@link Bloc }
     * {@link Region }
     * {@link Add }
     * {@link JAXBElement }{@code <}{@link Object }{@code >}
     * {@link Country }
     * {@link GeogName }
     * {@link Address }
     * {@link Unclear }
     * {@link JAXBElement }{@code <}{@link Tag }{@code >}
     * {@link JAXBElement }{@code <}{@link TeiModelGlobalEdit }{@code >}
     * {@link Media }
     * {@link District }
     * {@link Measure }
     * {@link Ident }
     * {@link BinaryObject }
     * {@link Forename }
     * {@link Title }
     * {@link Reg }
     * {@link Affiliation }
     * {@link JAXBElement }{@code <}{@link Alt }{@code >}
     * {@link Mentioned }
     * {@link JAXBElement }{@code <}{@link Gi }{@code >}
     * {@link Orig }
     * {@link Del }
     * {@link Geo }
     * {@link JAXBElement }{@code <}{@link SpecDesc }{@code >}
     * {@link Abbr }
     * {@link JAXBElement }{@code <}{@link Milestone }{@code >}
     * {@link PersName }
     * {@link State }
     * {@link AddName }
     * {@link Foreign }
     * {@link Time }
     * {@link Settlement }
     * {@link Idno }
     * {@link RoleName }
     * {@link NotatedMusic }
     * {@link Rs }
     * {@link JAXBElement }{@code <}{@link JoinGrp }{@code >}
     * {@link JAXBElement }{@code <}{@link Link }{@code >}
     * {@link Population }
     * {@link JAXBElement }{@code <}{@link LinkGrp }{@code >}
     * {@link PlaceName }
     * {@link OrgName }
     * {@link JAXBElement }{@code <}{@link Pb }{@code >}
     * {@link Climate }
     * {@link Gloss }
     * {@link Num }
     * {@link Date }
     * {@link Name }
     * {@link Salute }
     * {@link Location }
     * {@link Trait }
     * {@link Choice }
     * {@link GenName }
     * {@link Email }
     * {@link JAXBElement }{@code <}{@link AltGrp }{@code >}
     * {@link JAXBElement }{@code <}{@link Ptr }{@code >}
     * {@link JAXBElement }{@code <}{@link TeiModelSegLike }{@code >}
     * {@link JAXBElement }{@code <}{@link Ref }{@code >}
     * {@link Figure }
     * {@link Offset }
     * {@link JAXBElement }{@code <}{@link Lb }{@code >}
     * {@link JAXBElement }{@code <}{@link Signed }{@code >}
     * {@link Terrain }
     * {@link JAXBElement }{@code <}{@link SpecList }{@code >}
     * {@link JAXBElement }{@code <}{@link Index }{@code >}
     * {@link JAXBElement }{@code <}{@link Object }{@code >}
     * {@link String }
     * {@link JAXBElement }{@code <}{@link Timeline }{@code >}
     * {@link Emph }
     * {@link Formula }
     * {@link Distinct }
     * {@link GeogFeat }
     * {@link JAXBElement }{@code <}{@link Object }{@code >}
     * {@link JAXBElement }{@code <}{@link Val }{@code >}
     * {@link Term }
     * {@link Code }
     * {@link NameLink }
     * {@link JAXBElement }{@code <}{@link Object }{@code >}
     * {@link MeasureGrp }
     * {@link Expan }
     * {@link JAXBElement }{@code <}{@link TeiModelSegLike }{@code >}
     * {@link Hi }
     * {@link Graphic }
     * {@link JAXBElement }{@code <}{@link Gb }{@code >}
     * {@link Surname }
     * {@link JAXBElement }{@code <}{@link Join }{@code >}
     * {@link SoCalled }
     * {@link JAXBElement }{@code <}{@link Cb }{@code >}
     * {@link JAXBElement }{@code <}{@link Anchor }{@code >}
     * {@link Corr }
     * {@link JAXBElement }{@code <}{@link Object }{@code >}
     * {@link Note }
     * {@link Sic }
     * 
     * 
     */
    public List<Serializable> getContent() {
        if (content == null) {
            content = new ArrayList<Serializable>();
        }
        return this.content;
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
     * Obtient la valeur de la propriété hand.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getHand() {
        return hand;
    }

    /**
     * Définit la valeur de la propriété hand.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setHand(String value) {
        this.hand = value;
    }

}
