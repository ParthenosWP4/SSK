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
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElements;
import javax.xml.bind.annotation.XmlID;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlSchemaType;
import javax.xml.bind.annotation.XmlType;
import javax.xml.bind.annotation.adapters.CollapsedStringAdapter;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;
import javax.xml.datatype.XMLGregorianCalendar;


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
 *         &lt;choice maxOccurs="unbounded" minOccurs="0">
 *           &lt;group ref="{http://www.tei-c.org/ns/1.0}tei_model.glossLike"/>
 *           &lt;group ref="{http://www.tei-c.org/ns/1.0}tei_model.descLike"/>
 *         &lt;/choice>
 *         &lt;element ref="{http://www.tei-c.org/ns/1.0}classes" minOccurs="0"/>
 *         &lt;element ref="{http://www.tei-c.org/ns/1.0}content" minOccurs="0"/>
 *         &lt;element ref="{http://www.tei-c.org/ns/1.0}valList" minOccurs="0"/>
 *         &lt;element ref="{http://www.tei-c.org/ns/1.0}constraintSpec" maxOccurs="unbounded" minOccurs="0"/>
 *         &lt;element ref="{http://www.tei-c.org/ns/1.0}attList" minOccurs="0"/>
 *         &lt;choice maxOccurs="unbounded" minOccurs="0">
 *           &lt;element ref="{http://www.tei-c.org/ns/1.0}model"/>
 *           &lt;element ref="{http://www.tei-c.org/ns/1.0}modelGrp"/>
 *           &lt;element ref="{http://www.tei-c.org/ns/1.0}modelSequence"/>
 *         &lt;/choice>
 *         &lt;element ref="{http://www.tei-c.org/ns/1.0}exemplum" maxOccurs="unbounded" minOccurs="0"/>
 *         &lt;element ref="{http://www.tei-c.org/ns/1.0}remarks" maxOccurs="unbounded" minOccurs="0"/>
 *         &lt;element ref="{http://www.tei-c.org/ns/1.0}listRef" maxOccurs="unbounded" minOccurs="0"/>
 *       &lt;/sequence>
 *       &lt;attGroup ref="{http://www.tei-c.org/ns/1.0}tei_att.global.attributes"/>
 *       &lt;attGroup ref="{http://www.tei-c.org/ns/1.0}tei_att.namespaceable.attributes"/>
 *       &lt;attGroup ref="{http://www.tei-c.org/ns/1.0}tei_att.identified.attributes"/>
 *       &lt;attribute name="prefix" type="{http://www.w3.org/2001/XMLSchema}NCName" />
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
    "glossesAndEquivsAndAltIdents",
    "classes",
    "content",
    "valList",
    "constraintSpecs",
    "attList",
    "modelsAndModelGrpsAndModelSequences",
    "exempla",
    "remarks",
    "listReves"
})
@XmlRootElement(name = "elementSpec")
public class ElementSpec implements Serializable
{

    private final static long serialVersionUID = 1L;
    @XmlElements({
        @XmlElement(name = "gloss", type = Gloss.class),
        @XmlElement(name = "equiv", type = Equiv.class),
        @XmlElement(name = "altIdent", type = AltIdent.class),
        @XmlElement(name = "desc", type = Desc.class)
    })
    protected List<Serializable> glossesAndEquivsAndAltIdents;
    protected Classes classes;
    protected Content content;
    protected ValList valList;
    @XmlElement(name = "constraintSpec")
    protected List<ConstraintSpec> constraintSpecs;
    protected AttList attList;
    @XmlElements({
        @XmlElement(name = "model", type = Model.class),
        @XmlElement(name = "modelGrp", type = ModelGrp.class),
        @XmlElement(name = "modelSequence", type = ModelSequence.class)
    })
    protected List<Serializable> modelsAndModelGrpsAndModelSequences;
    @XmlElement(name = "exemplum")
    protected List<Exemplum> exempla;
    protected List<Remarks> remarks;
    @XmlElement(name = "listRef")
    protected List<ListRef> listReves;
    @XmlAttribute(name = "prefix")
    @XmlJavaTypeAdapter(CollapsedStringAdapter.class)
    @XmlSchemaType(name = "NCName")
    protected String prefix;
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
    @XmlAttribute(name = "ns")
    @XmlSchemaType(name = "anyURI")
    protected String ns;
    @XmlAttribute(name = "mode")
    @XmlJavaTypeAdapter(CollapsedStringAdapter.class)
    protected String mode;
    @XmlAttribute(name = "validUntil")
    @XmlSchemaType(name = "date")
    protected XMLGregorianCalendar validUntil;
    @XmlAttribute(name = "ident", required = true)
    @XmlJavaTypeAdapter(CollapsedStringAdapter.class)
    @XmlSchemaType(name = "Name")
    protected String ident;
    @XmlAttribute(name = "predeclare")
    protected Boolean predeclare;
    @XmlAttribute(name = "module")
    @XmlJavaTypeAdapter(CollapsedStringAdapter.class)
    @XmlSchemaType(name = "NCName")
    protected String module;

    /**
     * Gets the value of the glossesAndEquivsAndAltIdents property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the glossesAndEquivsAndAltIdents property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getGlossesAndEquivsAndAltIdents().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link Gloss }
     * {@link Equiv }
     * {@link AltIdent }
     * {@link Desc }
     * 
     * 
     */
    public List<Serializable> getGlossesAndEquivsAndAltIdents() {
        if (glossesAndEquivsAndAltIdents == null) {
            glossesAndEquivsAndAltIdents = new ArrayList<Serializable>();
        }
        return this.glossesAndEquivsAndAltIdents;
    }

    /**
     * Obtient la valeur de la propriété classes.
     * 
     * @return
     *     possible object is
     *     {@link Classes }
     *     
     */
    public Classes getClasses() {
        return classes;
    }

    /**
     * Définit la valeur de la propriété classes.
     * 
     * @param value
     *     allowed object is
     *     {@link Classes }
     *     
     */
    public void setClasses(Classes value) {
        this.classes = value;
    }

    /**
     * Obtient la valeur de la propriété content.
     * 
     * @return
     *     possible object is
     *     {@link Content }
     *     
     */
    public Content getContent() {
        return content;
    }

    /**
     * Définit la valeur de la propriété content.
     * 
     * @param value
     *     allowed object is
     *     {@link Content }
     *     
     */
    public void setContent(Content value) {
        this.content = value;
    }

    /**
     * Obtient la valeur de la propriété valList.
     * 
     * @return
     *     possible object is
     *     {@link ValList }
     *     
     */
    public ValList getValList() {
        return valList;
    }

    /**
     * Définit la valeur de la propriété valList.
     * 
     * @param value
     *     allowed object is
     *     {@link ValList }
     *     
     */
    public void setValList(ValList value) {
        this.valList = value;
    }

    /**
     * Gets the value of the constraintSpecs property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the constraintSpecs property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getConstraintSpecs().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link ConstraintSpec }
     * 
     * 
     */
    public List<ConstraintSpec> getConstraintSpecs() {
        if (constraintSpecs == null) {
            constraintSpecs = new ArrayList<ConstraintSpec>();
        }
        return this.constraintSpecs;
    }

    /**
     * Obtient la valeur de la propriété attList.
     * 
     * @return
     *     possible object is
     *     {@link AttList }
     *     
     */
    public AttList getAttList() {
        return attList;
    }

    /**
     * Définit la valeur de la propriété attList.
     * 
     * @param value
     *     allowed object is
     *     {@link AttList }
     *     
     */
    public void setAttList(AttList value) {
        this.attList = value;
    }

    /**
     * Gets the value of the modelsAndModelGrpsAndModelSequences property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the modelsAndModelGrpsAndModelSequences property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getModelsAndModelGrpsAndModelSequences().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link Model }
     * {@link ModelGrp }
     * {@link ModelSequence }
     * 
     * 
     */
    public List<Serializable> getModelsAndModelGrpsAndModelSequences() {
        if (modelsAndModelGrpsAndModelSequences == null) {
            modelsAndModelGrpsAndModelSequences = new ArrayList<Serializable>();
        }
        return this.modelsAndModelGrpsAndModelSequences;
    }

    /**
     * Gets the value of the exempla property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the exempla property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getExempla().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link Exemplum }
     * 
     * 
     */
    public List<Exemplum> getExempla() {
        if (exempla == null) {
            exempla = new ArrayList<Exemplum>();
        }
        return this.exempla;
    }

    /**
     * Gets the value of the remarks property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the remarks property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getRemarks().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link Remarks }
     * 
     * 
     */
    public List<Remarks> getRemarks() {
        if (remarks == null) {
            remarks = new ArrayList<Remarks>();
        }
        return this.remarks;
    }

    /**
     * Gets the value of the listReves property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the listReves property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getListReves().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link ListRef }
     * 
     * 
     */
    public List<ListRef> getListReves() {
        if (listReves == null) {
            listReves = new ArrayList<ListRef>();
        }
        return this.listReves;
    }

    /**
     * Obtient la valeur de la propriété prefix.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getPrefix() {
        return prefix;
    }

    /**
     * Définit la valeur de la propriété prefix.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setPrefix(String value) {
        this.prefix = value;
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
     * Obtient la valeur de la propriété ns.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getNs() {
        if (ns == null) {
            return "http://www.tei-c.org/ns/1.0";
        } else {
            return ns;
        }
    }

    /**
     * Définit la valeur de la propriété ns.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setNs(String value) {
        this.ns = value;
    }

    /**
     * Obtient la valeur de la propriété mode.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getMode() {
        if (mode == null) {
            return "add";
        } else {
            return mode;
        }
    }

    /**
     * Définit la valeur de la propriété mode.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setMode(String value) {
        this.mode = value;
    }

    /**
     * Obtient la valeur de la propriété validUntil.
     * 
     * @return
     *     possible object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public XMLGregorianCalendar getValidUntil() {
        return validUntil;
    }

    /**
     * Définit la valeur de la propriété validUntil.
     * 
     * @param value
     *     allowed object is
     *     {@link XMLGregorianCalendar }
     *     
     */
    public void setValidUntil(XMLGregorianCalendar value) {
        this.validUntil = value;
    }

    /**
     * Obtient la valeur de la propriété ident.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getIdent() {
        return ident;
    }

    /**
     * Définit la valeur de la propriété ident.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setIdent(String value) {
        this.ident = value;
    }

    /**
     * Obtient la valeur de la propriété predeclare.
     * 
     * @return
     *     possible object is
     *     {@link Boolean }
     *     
     */
    public boolean isPredeclare() {
        if (predeclare == null) {
            return false;
        } else {
            return predeclare;
        }
    }

    /**
     * Définit la valeur de la propriété predeclare.
     * 
     * @param value
     *     allowed object is
     *     {@link Boolean }
     *     
     */
    public void setPredeclare(Boolean value) {
        this.predeclare = value;
    }

    /**
     * Obtient la valeur de la propriété module.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getModule() {
        return module;
    }

    /**
     * Définit la valeur de la propriété module.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setModule(String value) {
        this.module = value;
    }

}
