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
import javax.xml.bind.annotation.XmlElementRef;
import javax.xml.bind.annotation.XmlElementRefs;
import javax.xml.bind.annotation.XmlMixed;
import javax.xml.bind.annotation.XmlSeeAlso;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Classe Java pour tei_macro.phraseSeq complex type.
 * 
 * <p>Le fragment de schéma suivant indique le contenu attendu figurant dans cette classe.
 * 
 * <pre>
 * &lt;complexType name="tei_macro.phraseSeq">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;choice maxOccurs="unbounded" minOccurs="0">
 *         &lt;group ref="{http://www.tei-c.org/ns/1.0}tei_model.phrase"/>
 *         &lt;group ref="{http://www.tei-c.org/ns/1.0}tei_model.global"/>
 *       &lt;/choice>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "tei_macro.phraseSeq", propOrder = {
    "content"
})
@XmlSeeAlso({
    GeoDecl.class,
    Faith.class,
    Death.class,
    Residence.class,
    Birth.class,
    Education.class,
    Street.class,
    AddrLine.class,
    Floruit.class,
    SocecStatus.class,
    Sex.class,
    Nationality.class,
    Extent.class,
    CitedRange.class,
    TextLang.class,
    HeadItem.class,
    HeadLabel.class,
    DocDate.class,
    DocAuthor.class,
    Speaker.class,
    Eg.class,
    RoleName.class,
    AddName.class,
    NameLink.class,
    GenName.class,
    Forename.class,
    Surname.class,
    Rs.class,
    BiblScope.class,
    PubPlace.class,
    Distributor.class,
    Publisher.class,
    Edition.class,
    Editor.class,
    Author.class,
    Label.class,
    GeogName.class,
    Settlement.class,
    District.class,
    Region.class,
    Country.class,
    Bloc.class,
    PlaceName.class,
    GeogFeat.class,
    Offset.class,
    PersName.class,
    OrgName.class,
    Name.class,
    Affiliation.class,
    Email.class,
    Measure.class,
    Num.class,
    Expan.class,
    Abbr.class,
    Term.class,
    Gloss.class,
    SoCalled.class,
    Mentioned.class,
    Distinct.class,
    Foreign.class
})
public class TeiMacroPhraseSeq implements Serializable
{

    private final static long serialVersionUID = 1L;
    @XmlElementRefs({
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
     * {@link JAXBElement }{@code <}{@link TeiModelGlobalEdit }{@code >}
     * {@link Date }
     * {@link JAXBElement }{@code <}{@link Att }{@code >}
     * {@link Bloc }
     * {@link Region }
     * {@link Add }
     * {@link JAXBElement }{@code <}{@link Object }{@code >}
     * {@link Country }
     * {@link GeogName }
     * {@link Address }
     * {@link Unclear }
     * {@link Name }
     * {@link JAXBElement }{@code <}{@link Tag }{@code >}
     * {@link JAXBElement }{@code <}{@link TeiModelGlobalEdit }{@code >}
     * {@link Media }
     * {@link Location }
     * {@link District }
     * {@link Measure }
     * {@link Trait }
     * {@link Ident }
     * {@link BinaryObject }
     * {@link Choice }
     * {@link Forename }
     * {@link GenName }
     * {@link Title }
     * {@link Reg }
     * {@link Email }
     * {@link Affiliation }
     * {@link JAXBElement }{@code <}{@link Alt }{@code >}
     * {@link JAXBElement }{@code <}{@link AltGrp }{@code >}
     * {@link JAXBElement }{@code <}{@link Ptr }{@code >}
     * {@link Mentioned }
     * {@link JAXBElement }{@code <}{@link Gi }{@code >}
     * {@link Orig }
     * {@link Del }
     * {@link JAXBElement }{@code <}{@link TeiModelSegLike }{@code >}
     * {@link Geo }
     * {@link JAXBElement }{@code <}{@link SpecDesc }{@code >}
     * {@link Abbr }
     * {@link JAXBElement }{@code <}{@link Milestone }{@code >}
     * {@link JAXBElement }{@code <}{@link Ref }{@code >}
     * {@link Figure }
     * {@link PersName }
     * {@link Offset }
     * {@link JAXBElement }{@code <}{@link Lb }{@code >}
     * {@link State }
     * {@link AddName }
     * {@link Terrain }
     * {@link Foreign }
     * {@link JAXBElement }{@code <}{@link SpecList }{@code >}
     * {@link Time }
     * {@link Settlement }
     * {@link JAXBElement }{@code <}{@link Index }{@code >}
     * {@link JAXBElement }{@code <}{@link Object }{@code >}
     * {@link Idno }
     * {@link String }
     * {@link JAXBElement }{@code <}{@link Timeline }{@code >}
     * {@link Emph }
     * {@link Formula }
     * {@link Distinct }
     * {@link GeogFeat }
     * {@link JAXBElement }{@code <}{@link Object }{@code >}
     * {@link RoleName }
     * {@link JAXBElement }{@code <}{@link Val }{@code >}
     * {@link Term }
     * {@link Code }
     * {@link NameLink }
     * {@link JAXBElement }{@code <}{@link Object }{@code >}
     * {@link NotatedMusic }
     * {@link Rs }
     * {@link MeasureGrp }
     * {@link JAXBElement }{@code <}{@link JoinGrp }{@code >}
     * {@link Expan }
     * {@link JAXBElement }{@code <}{@link TeiModelSegLike }{@code >}
     * {@link JAXBElement }{@code <}{@link Link }{@code >}
     * {@link Hi }
     * {@link Population }
     * {@link JAXBElement }{@code <}{@link LinkGrp }{@code >}
     * {@link PlaceName }
     * {@link Graphic }
     * {@link OrgName }
     * {@link JAXBElement }{@code <}{@link Gb }{@code >}
     * {@link JAXBElement }{@code <}{@link Pb }{@code >}
     * {@link Climate }
     * {@link Surname }
     * {@link JAXBElement }{@code <}{@link Join }{@code >}
     * {@link SoCalled }
     * {@link JAXBElement }{@code <}{@link Cb }{@code >}
     * {@link JAXBElement }{@code <}{@link Anchor }{@code >}
     * {@link Corr }
     * {@link JAXBElement }{@code <}{@link Object }{@code >}
     * {@link Note }
     * {@link Gloss }
     * {@link Sic }
     * {@link Num }
     * 
     * 
     */
    public List<Serializable> getContent() {
        if (content == null) {
            content = new ArrayList<Serializable>();
        }
        return this.content;
    }

}
