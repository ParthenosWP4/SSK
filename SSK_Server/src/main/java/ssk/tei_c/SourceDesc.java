//
// Ce fichier a été généré par l'implémentation de référence JavaTM Architecture for XML Binding (JAXB), v2.2.8-b130911.1802 
// Voir <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Toute modification apportée à ce fichier sera perdue lors de la recompilation du schéma source. 
// Généré le : 2017.09.27 à 04:05:22 PM CEST 
//


package ssk.tei_c;

import java.io.Serializable;
import java.util.ArrayList;
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


/**
 * <p>Classe Java pour anonymous complex type.
 * 
 * <p>Le fragment de schéma suivant indique le contenu attendu figurant dans cette classe.
 * 
 * <pre>
 * &lt;complexType>
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;choice>
 *         &lt;group ref="{http://www.tei-c.org/ns/1.0}tei_model.pLike" maxOccurs="unbounded"/>
 *         &lt;choice maxOccurs="unbounded">
 *           &lt;group ref="{http://www.tei-c.org/ns/1.0}tei_model.biblLike"/>
 *           &lt;group ref="{http://www.tei-c.org/ns/1.0}tei_model.listLike"/>
 *         &lt;/choice>
 *       &lt;/choice>
 *       &lt;attGroup ref="{http://www.tei-c.org/ns/1.0}tei_att.declarable.attributes"/>
 *       &lt;attGroup ref="{http://www.tei-c.org/ns/1.0}tei_att.global.attributes"/>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
    "biblsAndBiblStructsAndListBibls",
    "psAndAbs"
})
@XmlRootElement(name = "sourceDesc")
public class SourceDesc
    implements Serializable
{

    private final static long serialVersionUID = 1L;
    @XmlElements({
        @XmlElement(name = "bibl", type = Bibl.class),
        @XmlElement(name = "biblStruct", type = BiblStruct.class),
        @XmlElement(name = "listBibl", type = ListBibl.class),
        @XmlElement(name = "biblFull", type = BiblFull.class),
        @XmlElement(name = "list", type = List.class),
        @XmlElement(name = "listOrg", type = ListOrg.class),
        @XmlElement(name = "listEvent", type = ListEvent.class),
        @XmlElement(name = "listPerson", type = ListPerson.class),
        @XmlElement(name = "listPlace", type = ListPlace.class),
        @XmlElement(name = "listNym", type = ListNym.class),
        @XmlElement(name = "table", type = Table.class)
    })
    protected java.util.List<Serializable> biblsAndBiblStructsAndListBibls;
    @XmlElements({
        @XmlElement(name = "p", type = P.class),
        @XmlElement(name = "ab", type = Ab.class)
    })
    protected java.util.List<TeiMacroParaContent> psAndAbs;
    @XmlAttribute(name = "default")
    @XmlJavaTypeAdapter(CollapsedStringAdapter.class)
    protected String _default;
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

    /**
     * Gets the value of the biblsAndBiblStructsAndListBibls property.
     * 
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the biblsAndBiblStructsAndListBibls property.
     * 
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getBiblsAndBiblStructsAndListBibls().add(newItem);
     * </pre>
     * 
     * 
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link Bibl }
     * {@link BiblStruct }
     * {@link ListBibl }
     * {@link BiblFull }
     * {@link List }
     * {@link ListOrg }
     * {@link ListEvent }
     * {@link ListPerson }
     * {@link ListPlace }
     * {@link ListNym }
     * {@link Table }
     * 
     * 
     */
    public java.util.List<Serializable> getBiblsAndBiblStructsAndListBibls() {
        if (biblsAndBiblStructsAndListBibls == null) {
            biblsAndBiblStructsAndListBibls = new ArrayList<Serializable>();
        }
        return this.biblsAndBiblStructsAndListBibls;
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
    public java.util.List<TeiMacroParaContent> getPSAndAbs() {
        if (psAndAbs == null) {
            psAndAbs = new ArrayList<TeiMacroParaContent>();
        }
        return this.psAndAbs;
    }

    /**
     * Obtient la valeur de la propriété default.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getDefault() {
        if (_default == null) {
            return "false";
        } else {
            return _default;
        }
    }

    /**
     * Définit la valeur de la propriété default.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setDefault(String value) {
        this._default = value;
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

}
