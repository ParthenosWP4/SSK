//
// Ce fichier a été généré par l'implémentation de référence JavaTM Architecture for XML Binding (JAXB), v2.2.8-b130911.1802 
// Voir <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Toute modification apportée à ce fichier sera perdue lors de la recompilation du schéma source. 
// Généré le : 2017.09.27 à 04:05:22 PM CEST 
//


package ssk.tei_c;

import java.io.Serializable;
import java.util.ArrayList;
import javax.xml.bind.JAXBElement;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElementRef;
import javax.xml.bind.annotation.XmlElementRefs;
import javax.xml.bind.annotation.XmlID;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlSchemaType;
import javax.xml.bind.annotation.XmlType;
import javax.xml.bind.annotation.adapters.CollapsedStringAdapter;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;
import ssk.tei_c.ns.examples.EgXML;


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
 *         &lt;group ref="{http://www.tei-c.org/ns/1.0}tei_model.headLike"/>
 *         &lt;group ref="{http://www.tei-c.org/ns/1.0}tei_model.common"/>
 *         &lt;element ref="{http://www.tei-c.org/ns/1.0}figDesc"/>
 *         &lt;group ref="{http://www.tei-c.org/ns/1.0}tei_model.graphicLike"/>
 *         &lt;group ref="{http://www.tei-c.org/ns/1.0}tei_model.global"/>
 *         &lt;group ref="{http://www.tei-c.org/ns/1.0}tei_model.divBottom"/>
 *       &lt;/choice>
 *       &lt;attGroup ref="{http://www.tei-c.org/ns/1.0}tei_att.placement.attributes"/>
 *       &lt;attGroup ref="{http://www.tei-c.org/ns/1.0}tei_att.global.attributes"/>
 *       &lt;attGroup ref="{http://www.tei-c.org/ns/1.0}tei_att.typed.attributes"/>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
    "headsAndLSAndPS"
})
@XmlRootElement(name = "figure")
public class Figure implements Serializable
{

    private final static long serialVersionUID = 1L;
    @XmlElementRefs({
        @XmlElementRef(name = "dateline", namespace = "http://www.tei-c.org/ns/1.0", type = Dateline.class, required = false),
        @XmlElementRef(name = "tei_model.global.edit", namespace = "http://www.tei-c.org/ns/1.0", type = JAXBElement.class, required = false),
        @XmlElementRef(name = "listPerson", namespace = "http://www.tei-c.org/ns/1.0", type = ListPerson.class, required = false),
        @XmlElementRef(name = "byline", namespace = "http://www.tei-c.org/ns/1.0", type = Byline.class, required = false),
        @XmlElementRef(name = "cit", namespace = "http://www.tei-c.org/ns/1.0", type = Cit.class, required = false),
        @XmlElementRef(name = "docDate", namespace = "http://www.tei-c.org/ns/1.0", type = DocDate.class, required = false),
        @XmlElementRef(name = "bibl", namespace = "http://www.tei-c.org/ns/1.0", type = Bibl.class, required = false),
        @XmlElementRef(name = "floatingText", namespace = "http://www.tei-c.org/ns/1.0", type = FloatingText.class, required = false),
        @XmlElementRef(name = "salute", namespace = "http://www.tei-c.org/ns/1.0", type = Salute.class, required = false),
        @XmlElementRef(name = "macroSpec", namespace = "http://www.tei-c.org/ns/1.0", type = MacroSpec.class, required = false),
        @XmlElementRef(name = "q", namespace = "http://www.tei-c.org/ns/1.0", type = Q.class, required = false),
        @XmlElementRef(name = "media", namespace = "http://www.tei-c.org/ns/1.0", type = Media.class, required = false),
        @XmlElementRef(name = "eg", namespace = "http://www.tei-c.org/ns/1.0", type = Eg.class, required = false),
        @XmlElementRef(name = "binaryObject", namespace = "http://www.tei-c.org/ns/1.0", type = BinaryObject.class, required = false),
        @XmlElementRef(name = "epigraph", namespace = "http://www.tei-c.org/ns/1.0", type = Epigraph.class, required = false),
        @XmlElementRef(name = "listBibl", namespace = "http://www.tei-c.org/ns/1.0", type = ListBibl.class, required = false),
        @XmlElementRef(name = "classSpec", namespace = "http://www.tei-c.org/ns/1.0", type = ClassSpec.class, required = false),
        @XmlElementRef(name = "listOrg", namespace = "http://www.tei-c.org/ns/1.0", type = ListOrg.class, required = false),
        @XmlElementRef(name = "figure", namespace = "http://www.tei-c.org/ns/1.0", type = Figure.class, required = false),
        @XmlElementRef(name = "tei_model.divBottomPart", namespace = "http://www.tei-c.org/ns/1.0", type = JAXBElement.class, required = false),
        @XmlElementRef(name = "meeting", namespace = "http://www.tei-c.org/ns/1.0", type = Meeting.class, required = false),
        @XmlElementRef(name = "label", namespace = "http://www.tei-c.org/ns/1.0", type = Label.class, required = false),
        @XmlElementRef(name = "l", namespace = "http://www.tei-c.org/ns/1.0", type = L.class, required = false),
        @XmlElementRef(name = "sp", namespace = "http://www.tei-c.org/ns/1.0", type = Sp.class, required = false),
        @XmlElementRef(name = "schemaSpec", namespace = "http://www.tei-c.org/ns/1.0", type = JAXBElement.class, required = false),
        @XmlElementRef(name = "listRef", namespace = "http://www.tei-c.org/ns/1.0", type = ListRef.class, required = false),
        @XmlElementRef(name = "table", namespace = "http://www.tei-c.org/ns/1.0", type = Table.class, required = false),
        @XmlElementRef(name = "docAuthor", namespace = "http://www.tei-c.org/ns/1.0", type = DocAuthor.class, required = false),
        @XmlElementRef(name = "said", namespace = "http://www.tei-c.org/ns/1.0", type = Said.class, required = false),
        @XmlElementRef(name = "desc", namespace = "http://www.tei-c.org/ns/1.0", type = Desc.class, required = false),
        @XmlElementRef(name = "moduleSpec", namespace = "http://www.tei-c.org/ns/1.0", type = ModuleSpec.class, required = false),
        @XmlElementRef(name = "figDesc", namespace = "http://www.tei-c.org/ns/1.0", type = FigDesc.class, required = false),
        @XmlElementRef(name = "listPlace", namespace = "http://www.tei-c.org/ns/1.0", type = ListPlace.class, required = false),
        @XmlElementRef(name = "listNym", namespace = "http://www.tei-c.org/ns/1.0", type = ListNym.class, required = false),
        @XmlElementRef(name = "tei_model.milestoneLike", namespace = "http://www.tei-c.org/ns/1.0", type = JAXBElement.class, required = false),
        @XmlElementRef(name = "specGrp", namespace = "http://www.tei-c.org/ns/1.0", type = SpecGrp.class, required = false),
        @XmlElementRef(name = "listEvent", namespace = "http://www.tei-c.org/ns/1.0", type = ListEvent.class, required = false),
        @XmlElementRef(name = "constraintSpec", namespace = "http://www.tei-c.org/ns/1.0", type = ConstraintSpec.class, required = false),
        @XmlElementRef(name = "dataSpec", namespace = "http://www.tei-c.org/ns/1.0", type = DataSpec.class, required = false),
        @XmlElementRef(name = "lg", namespace = "http://www.tei-c.org/ns/1.0", type = Lg.class, required = false),
        @XmlElementRef(name = "formula", namespace = "http://www.tei-c.org/ns/1.0", type = Formula.class, required = false),
        @XmlElementRef(name = "biblFull", namespace = "http://www.tei-c.org/ns/1.0", type = BiblFull.class, required = false),
        @XmlElementRef(name = "tei_model.global.meta", namespace = "http://www.tei-c.org/ns/1.0", type = JAXBElement.class, required = false),
        @XmlElementRef(name = "biblStruct", namespace = "http://www.tei-c.org/ns/1.0", type = BiblStruct.class, required = false),
        @XmlElementRef(name = "egXML", namespace = "http://www.tei-c.org/ns/Examples", type = EgXML.class, required = false),
        @XmlElementRef(name = "list", namespace = "http://www.tei-c.org/ns/1.0", type = List.class, required = false),
        @XmlElementRef(name = "quote", namespace = "http://www.tei-c.org/ns/1.0", type = Quote.class, required = false),
        @XmlElementRef(name = "p", namespace = "http://www.tei-c.org/ns/1.0", type = P.class, required = false),
        @XmlElementRef(name = "notatedMusic", namespace = "http://www.tei-c.org/ns/1.0", type = NotatedMusic.class, required = false),
        @XmlElementRef(name = "head", namespace = "http://www.tei-c.org/ns/1.0", type = Head.class, required = false),
        @XmlElementRef(name = "graphic", namespace = "http://www.tei-c.org/ns/1.0", type = Graphic.class, required = false),
        @XmlElementRef(name = "outputRendition", namespace = "http://www.tei-c.org/ns/1.0", type = OutputRendition.class, required = false),
        @XmlElementRef(name = "ab", namespace = "http://www.tei-c.org/ns/1.0", type = Ab.class, required = false),
        @XmlElementRef(name = "note", namespace = "http://www.tei-c.org/ns/1.0", type = Note.class, required = false),
        @XmlElementRef(name = "stage", namespace = "http://www.tei-c.org/ns/1.0", type = Stage.class, required = false),
        @XmlElementRef(name = "specGrpRef", namespace = "http://www.tei-c.org/ns/1.0", type = SpecGrpRef.class, required = false),
        @XmlElementRef(name = "argument", namespace = "http://www.tei-c.org/ns/1.0", type = Argument.class, required = false),
        @XmlElementRef(name = "elementSpec", namespace = "http://www.tei-c.org/ns/1.0", type = ElementSpec.class, required = false)
    })
    protected java.util.List<Serializable> headsAndLSAndPS;
    @XmlAttribute(name = "place")
    protected java.util.List<String> places;
    @XmlAttribute(name = "source")
    protected java.util.List<String> sources;
    @XmlAttribute(name = "n")
    protected String n;
    @XmlAttribute(name = "copyOf")
    @XmlSchemaType(name = "anyURI")
    protected String copyOf;
    @XmlAttribute(name = "synch")
    protected java.util.List<String> synches;
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
    protected java.util.List<String> selects;
    @XmlAttribute(name = "corresp")
    protected java.util.List<String> corresps;
    @XmlAttribute(name = "exclude")
    protected java.util.List<String> excludes;
    @XmlAttribute(name = "id", namespace = "http://www.w3.org/XML/1998/namespace")
    @XmlJavaTypeAdapter(CollapsedStringAdapter.class)
    @XmlID
    @XmlSchemaType(name = "ID")
    protected String id;
    @XmlAttribute(name = "rend")
    protected java.util.List<String> rends;
    @XmlAttribute(name = "style")
    protected String style;
    @XmlAttribute(name = "rendition")
    protected java.util.List<String> rendering;
    @XmlAttribute(name = "lang", namespace = "http://www.w3.org/XML/1998/namespace")
    protected String lang;
    @XmlAttribute(name = "base", namespace = "http://www.w3.org/XML/1998/namespace")
    @XmlSchemaType(name = "anyURI")
    protected String base;
    @XmlAttribute(name = "resp")
    protected java.util.List<String> resps;
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

    /**
     * Gets the value of the headsAndLSAndPS property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the headsAndLSAndPS property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getHeadsAndLSAndPS().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link Dateline }
     * {@link JAXBElement }{@code <}{@link TeiModelGlobalEdit }{@code >}
     * {@link ListPerson }
     * {@link Byline }
     * {@link Cit }
     * {@link DocDate }
     * {@link JAXBElement }{@code <}{@link Postscript }{@code >}
     * {@link Bibl }
     * {@link FloatingText }
     * {@link Salute }
     * {@link MacroSpec }
     * {@link JAXBElement }{@code <}{@link TeiModelGlobalEdit }{@code >}
     * {@link Q }
     * {@link Media }
     * {@link Eg }
     * {@link BinaryObject }
     * {@link Epigraph }
     * {@link JAXBElement }{@code <}{@link Alt }{@code >}
     * {@link JAXBElement }{@code <}{@link AltGrp }{@code >}
     * {@link ListBibl }
     * {@link JAXBElement }{@code <}{@link Trailer }{@code >}
     * {@link ClassSpec }
     * {@link JAXBElement }{@code <}{@link Milestone }{@code >}
     * {@link ListOrg }
     * {@link Figure }
     * {@link JAXBElement }{@code <}{@link Object }{@code >}
     * {@link Meeting }
     * {@link JAXBElement }{@code <}{@link Lb }{@code >}
     * {@link Label }
     * {@link L }
     * {@link JAXBElement }{@code <}{@link Signed }{@code >}
     * {@link Sp }
     * {@link JAXBElement }{@code <}{@link SchemaSpec }{@code >}
     * {@link ListRef }
     * {@link Table }
     * {@link DocAuthor }
     * {@link Said }
     * {@link Desc }
     * {@link ModuleSpec }
     * {@link FigDesc }
     * {@link ListPlace }
     * {@link JAXBElement }{@code <}{@link Index }{@code >}
     * {@link ListNym }
     * {@link JAXBElement }{@code <}{@link Object }{@code >}
     * {@link SpecGrp }
     * {@link ListEvent }
     * {@link ConstraintSpec }
     * {@link JAXBElement }{@code <}{@link Timeline }{@code >}
     * {@link DataSpec }
     * {@link Lg }
     * {@link Formula }
     * {@link BiblFull }
     * {@link JAXBElement }{@code <}{@link Object }{@code >}
     * {@link BiblStruct }
     * {@link EgXML }
     * {@link List }
     * {@link Quote }
     * {@link P }
     * {@link NotatedMusic }
     * {@link JAXBElement }{@code <}{@link Closer }{@code >}
     * {@link JAXBElement }{@code <}{@link JoinGrp }{@code >}
     * {@link Head }
     * {@link JAXBElement }{@code <}{@link Link }{@code >}
     * {@link JAXBElement }{@code <}{@link LinkGrp }{@code >}
     * {@link Graphic }
     * {@link JAXBElement }{@code <}{@link Gb }{@code >}
     * {@link JAXBElement }{@code <}{@link Pb }{@code >}
     * {@link OutputRendition }
     * {@link JAXBElement }{@code <}{@link Join }{@code >}
     * {@link JAXBElement }{@code <}{@link Cb }{@code >}
     * {@link JAXBElement }{@code <}{@link Anchor }{@code >}
     * {@link Ab }
     * {@link Note }
     * {@link Stage }
     * {@link SpecGrpRef }
     * {@link Argument }
     * {@link ElementSpec }
     * 
     * 
     */
    public java.util.List<Serializable> getHeadsAndLSAndPS() {
        if (headsAndLSAndPS == null) {
            headsAndLSAndPS = new ArrayList<Serializable>();
        }
        return this.headsAndLSAndPS;
    }

    /**
     * Gets the value of the places property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the places property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getPlaces().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link String }
     * 
     * 
     */
    public java.util.List<String> getPlaces() {
        if (places == null) {
            places = new ArrayList<String>();
        }
        return this.places;
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
    public java.util.List<String> getSources() {
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
    public java.util.List<String> getSynches() {
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
    public java.util.List<String> getSelects() {
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
    public java.util.List<String> getCorresps() {
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
    public java.util.List<String> getExcludes() {
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
    public java.util.List<String> getRends() {
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
    public java.util.List<String> getRendering() {
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
    public java.util.List<String> getResps() {
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

}
