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
import javax.xml.bind.annotation.XmlElementRef;
import javax.xml.bind.annotation.XmlElementRefs;
import javax.xml.bind.annotation.XmlMixed;
import javax.xml.bind.annotation.XmlSeeAlso;
import javax.xml.bind.annotation.XmlType;
import ssk.tei_c.ns.examples.EgXML;


/**
 * <p>Classe Java pour tei_macro.specialPara complex type.
 * 
 * <p>Le fragment de schéma suivant indique le contenu attendu figurant dans cette classe.
 * 
 * <pre>
 * &lt;complexType name="tei_macro.specialPara">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;choice maxOccurs="unbounded" minOccurs="0">
 *         &lt;group ref="{http://www.tei-c.org/ns/1.0}tei_model.phrase"/>
 *         &lt;group ref="{http://www.tei-c.org/ns/1.0}tei_model.inter"/>
 *         &lt;group ref="{http://www.tei-c.org/ns/1.0}tei_model.divPart"/>
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
@XmlType(name = "tei_macro.specialPara", propOrder = {
    "content"
})
@XmlSeeAlso({
    TeiModelAvailabilityPart.class,
    Occupation.class,
    Change.class,
    Note.class,
    Item.class,
    Q.class,
    Said.class,
    Quote.class,
    Stage.class,
    Cell.class
})
public class TeiMacroSpecialPara implements Serializable
{

    private final static long serialVersionUID = 1L;
    @XmlElementRefs({
        @XmlElementRef(name = "tei_model.global.edit", namespace = "http://www.tei-c.org/ns/1.0", type = JAXBElement.class, required = false),
        @XmlElementRef(name = "bloc", namespace = "http://www.tei-c.org/ns/1.0", type = Bloc.class, required = false),
        @XmlElementRef(name = "region", namespace = "http://www.tei-c.org/ns/1.0", type = Region.class, required = false),
        @XmlElementRef(name = "add", namespace = "http://www.tei-c.org/ns/1.0", type = Add.class, required = false),
        @XmlElementRef(name = "tei_model.phrase.xml", namespace = "http://www.tei-c.org/ns/1.0", type = JAXBElement.class, required = false),
        @XmlElementRef(name = "bibl", namespace = "http://www.tei-c.org/ns/1.0", type = Bibl.class, required = false),
        @XmlElementRef(name = "country", namespace = "http://www.tei-c.org/ns/1.0", type = Country.class, required = false),
        @XmlElementRef(name = "geogName", namespace = "http://www.tei-c.org/ns/1.0", type = GeogName.class, required = false),
        @XmlElementRef(name = "address", namespace = "http://www.tei-c.org/ns/1.0", type = Address.class, required = false),
        @XmlElementRef(name = "unclear", namespace = "http://www.tei-c.org/ns/1.0", type = Unclear.class, required = false),
        @XmlElementRef(name = "macroSpec", namespace = "http://www.tei-c.org/ns/1.0", type = MacroSpec.class, required = false),
        @XmlElementRef(name = "media", namespace = "http://www.tei-c.org/ns/1.0", type = Media.class, required = false),
        @XmlElementRef(name = "q", namespace = "http://www.tei-c.org/ns/1.0", type = Q.class, required = false),
        @XmlElementRef(name = "district", namespace = "http://www.tei-c.org/ns/1.0", type = District.class, required = false),
        @XmlElementRef(name = "measure", namespace = "http://www.tei-c.org/ns/1.0", type = Measure.class, required = false),
        @XmlElementRef(name = "ident", namespace = "http://www.tei-c.org/ns/1.0", type = Ident.class, required = false),
        @XmlElementRef(name = "binaryObject", namespace = "http://www.tei-c.org/ns/1.0", type = BinaryObject.class, required = false),
        @XmlElementRef(name = "forename", namespace = "http://www.tei-c.org/ns/1.0", type = Forename.class, required = false),
        @XmlElementRef(name = "title", namespace = "http://www.tei-c.org/ns/1.0", type = Title.class, required = false),
        @XmlElementRef(name = "reg", namespace = "http://www.tei-c.org/ns/1.0", type = Reg.class, required = false),
        @XmlElementRef(name = "affiliation", namespace = "http://www.tei-c.org/ns/1.0", type = Affiliation.class, required = false),
        @XmlElementRef(name = "listBibl", namespace = "http://www.tei-c.org/ns/1.0", type = ListBibl.class, required = false),
        @XmlElementRef(name = "mentioned", namespace = "http://www.tei-c.org/ns/1.0", type = Mentioned.class, required = false),
        @XmlElementRef(name = "orig", namespace = "http://www.tei-c.org/ns/1.0", type = Orig.class, required = false),
        @XmlElementRef(name = "del", namespace = "http://www.tei-c.org/ns/1.0", type = Del.class, required = false),
        @XmlElementRef(name = "geo", namespace = "http://www.tei-c.org/ns/1.0", type = Geo.class, required = false),
        @XmlElementRef(name = "abbr", namespace = "http://www.tei-c.org/ns/1.0", type = Abbr.class, required = false),
        @XmlElementRef(name = "persName", namespace = "http://www.tei-c.org/ns/1.0", type = PersName.class, required = false),
        @XmlElementRef(name = "label", namespace = "http://www.tei-c.org/ns/1.0", type = Label.class, required = false),
        @XmlElementRef(name = "sp", namespace = "http://www.tei-c.org/ns/1.0", type = Sp.class, required = false),
        @XmlElementRef(name = "state", namespace = "http://www.tei-c.org/ns/1.0", type = State.class, required = false),
        @XmlElementRef(name = "addName", namespace = "http://www.tei-c.org/ns/1.0", type = AddName.class, required = false),
        @XmlElementRef(name = "listRef", namespace = "http://www.tei-c.org/ns/1.0", type = ListRef.class, required = false),
        @XmlElementRef(name = "schemaSpec", namespace = "http://www.tei-c.org/ns/1.0", type = JAXBElement.class, required = false),
        @XmlElementRef(name = "said", namespace = "http://www.tei-c.org/ns/1.0", type = Said.class, required = false),
        @XmlElementRef(name = "foreign", namespace = "http://www.tei-c.org/ns/1.0", type = Foreign.class, required = false),
        @XmlElementRef(name = "desc", namespace = "http://www.tei-c.org/ns/1.0", type = Desc.class, required = false),
        @XmlElementRef(name = "time", namespace = "http://www.tei-c.org/ns/1.0", type = Time.class, required = false),
        @XmlElementRef(name = "settlement", namespace = "http://www.tei-c.org/ns/1.0", type = Settlement.class, required = false),
        @XmlElementRef(name = "listPlace", namespace = "http://www.tei-c.org/ns/1.0", type = ListPlace.class, required = false),
        @XmlElementRef(name = "listNym", namespace = "http://www.tei-c.org/ns/1.0", type = ListNym.class, required = false),
        @XmlElementRef(name = "idno", namespace = "http://www.tei-c.org/ns/1.0", type = Idno.class, required = false),
        @XmlElementRef(name = "specGrp", namespace = "http://www.tei-c.org/ns/1.0", type = SpecGrp.class, required = false),
        @XmlElementRef(name = "listEvent", namespace = "http://www.tei-c.org/ns/1.0", type = ListEvent.class, required = false),
        @XmlElementRef(name = "dataSpec", namespace = "http://www.tei-c.org/ns/1.0", type = DataSpec.class, required = false),
        @XmlElementRef(name = "roleName", namespace = "http://www.tei-c.org/ns/1.0", type = RoleName.class, required = false),
        @XmlElementRef(name = "egXML", namespace = "http://www.tei-c.org/ns/Examples", type = EgXML.class, required = false),
        @XmlElementRef(name = "p", namespace = "http://www.tei-c.org/ns/1.0", type = P.class, required = false),
        @XmlElementRef(name = "notatedMusic", namespace = "http://www.tei-c.org/ns/1.0", type = NotatedMusic.class, required = false),
        @XmlElementRef(name = "rs", namespace = "http://www.tei-c.org/ns/1.0", type = Rs.class, required = false),
        @XmlElementRef(name = "population", namespace = "http://www.tei-c.org/ns/1.0", type = Population.class, required = false),
        @XmlElementRef(name = "placeName", namespace = "http://www.tei-c.org/ns/1.0", type = PlaceName.class, required = false),
        @XmlElementRef(name = "orgName", namespace = "http://www.tei-c.org/ns/1.0", type = OrgName.class, required = false),
        @XmlElementRef(name = "climate", namespace = "http://www.tei-c.org/ns/1.0", type = Climate.class, required = false),
        @XmlElementRef(name = "ab", namespace = "http://www.tei-c.org/ns/1.0", type = Ab.class, required = false),
        @XmlElementRef(name = "gloss", namespace = "http://www.tei-c.org/ns/1.0", type = Gloss.class, required = false),
        @XmlElementRef(name = "stage", namespace = "http://www.tei-c.org/ns/1.0", type = Stage.class, required = false),
        @XmlElementRef(name = "num", namespace = "http://www.tei-c.org/ns/1.0", type = Num.class, required = false),
        @XmlElementRef(name = "listPerson", namespace = "http://www.tei-c.org/ns/1.0", type = ListPerson.class, required = false),
        @XmlElementRef(name = "date", namespace = "http://www.tei-c.org/ns/1.0", type = Date.class, required = false),
        @XmlElementRef(name = "cit", namespace = "http://www.tei-c.org/ns/1.0", type = Cit.class, required = false),
        @XmlElementRef(name = "floatingText", namespace = "http://www.tei-c.org/ns/1.0", type = FloatingText.class, required = false),
        @XmlElementRef(name = "name", namespace = "http://www.tei-c.org/ns/1.0", type = Name.class, required = false),
        @XmlElementRef(name = "location", namespace = "http://www.tei-c.org/ns/1.0", type = Location.class, required = false),
        @XmlElementRef(name = "eg", namespace = "http://www.tei-c.org/ns/1.0", type = Eg.class, required = false),
        @XmlElementRef(name = "trait", namespace = "http://www.tei-c.org/ns/1.0", type = Trait.class, required = false),
        @XmlElementRef(name = "choice", namespace = "http://www.tei-c.org/ns/1.0", type = Choice.class, required = false),
        @XmlElementRef(name = "genName", namespace = "http://www.tei-c.org/ns/1.0", type = GenName.class, required = false),
        @XmlElementRef(name = "email", namespace = "http://www.tei-c.org/ns/1.0", type = Email.class, required = false),
        @XmlElementRef(name = "classSpec", namespace = "http://www.tei-c.org/ns/1.0", type = ClassSpec.class, required = false),
        @XmlElementRef(name = "listOrg", namespace = "http://www.tei-c.org/ns/1.0", type = ListOrg.class, required = false),
        @XmlElementRef(name = "figure", namespace = "http://www.tei-c.org/ns/1.0", type = Figure.class, required = false),
        @XmlElementRef(name = "offset", namespace = "http://www.tei-c.org/ns/1.0", type = Offset.class, required = false),
        @XmlElementRef(name = "l", namespace = "http://www.tei-c.org/ns/1.0", type = L.class, required = false),
        @XmlElementRef(name = "table", namespace = "http://www.tei-c.org/ns/1.0", type = Table.class, required = false),
        @XmlElementRef(name = "terrain", namespace = "http://www.tei-c.org/ns/1.0", type = Terrain.class, required = false),
        @XmlElementRef(name = "moduleSpec", namespace = "http://www.tei-c.org/ns/1.0", type = ModuleSpec.class, required = false),
        @XmlElementRef(name = "tei_model.milestoneLike", namespace = "http://www.tei-c.org/ns/1.0", type = JAXBElement.class, required = false),
        @XmlElementRef(name = "constraintSpec", namespace = "http://www.tei-c.org/ns/1.0", type = ConstraintSpec.class, required = false),
        @XmlElementRef(name = "emph", namespace = "http://www.tei-c.org/ns/1.0", type = Emph.class, required = false),
        @XmlElementRef(name = "formula", namespace = "http://www.tei-c.org/ns/1.0", type = Formula.class, required = false),
        @XmlElementRef(name = "lg", namespace = "http://www.tei-c.org/ns/1.0", type = Lg.class, required = false),
        @XmlElementRef(name = "distinct", namespace = "http://www.tei-c.org/ns/1.0", type = Distinct.class, required = false),
        @XmlElementRef(name = "geogFeat", namespace = "http://www.tei-c.org/ns/1.0", type = GeogFeat.class, required = false),
        @XmlElementRef(name = "biblFull", namespace = "http://www.tei-c.org/ns/1.0", type = BiblFull.class, required = false),
        @XmlElementRef(name = "tei_model.global.meta", namespace = "http://www.tei-c.org/ns/1.0", type = JAXBElement.class, required = false),
        @XmlElementRef(name = "biblStruct", namespace = "http://www.tei-c.org/ns/1.0", type = BiblStruct.class, required = false),
        @XmlElementRef(name = "term", namespace = "http://www.tei-c.org/ns/1.0", type = Term.class, required = false),
        @XmlElementRef(name = "code", namespace = "http://www.tei-c.org/ns/1.0", type = Code.class, required = false),
        @XmlElementRef(name = "list", namespace = "http://www.tei-c.org/ns/1.0", type = List.class, required = false),
        @XmlElementRef(name = "quote", namespace = "http://www.tei-c.org/ns/1.0", type = Quote.class, required = false),
        @XmlElementRef(name = "nameLink", namespace = "http://www.tei-c.org/ns/1.0", type = NameLink.class, required = false),
        @XmlElementRef(name = "tei_model.specDescLike", namespace = "http://www.tei-c.org/ns/1.0", type = JAXBElement.class, required = false),
        @XmlElementRef(name = "measureGrp", namespace = "http://www.tei-c.org/ns/1.0", type = MeasureGrp.class, required = false),
        @XmlElementRef(name = "expan", namespace = "http://www.tei-c.org/ns/1.0", type = Expan.class, required = false),
        @XmlElementRef(name = "tei_model.segLike", namespace = "http://www.tei-c.org/ns/1.0", type = JAXBElement.class, required = false),
        @XmlElementRef(name = "hi", namespace = "http://www.tei-c.org/ns/1.0", type = Hi.class, required = false),
        @XmlElementRef(name = "graphic", namespace = "http://www.tei-c.org/ns/1.0", type = Graphic.class, required = false),
        @XmlElementRef(name = "surname", namespace = "http://www.tei-c.org/ns/1.0", type = Surname.class, required = false),
        @XmlElementRef(name = "outputRendition", namespace = "http://www.tei-c.org/ns/1.0", type = OutputRendition.class, required = false),
        @XmlElementRef(name = "soCalled", namespace = "http://www.tei-c.org/ns/1.0", type = SoCalled.class, required = false),
        @XmlElementRef(name = "corr", namespace = "http://www.tei-c.org/ns/1.0", type = Corr.class, required = false),
        @XmlElementRef(name = "tei_model.ptrLike", namespace = "http://www.tei-c.org/ns/1.0", type = JAXBElement.class, required = false),
        @XmlElementRef(name = "note", namespace = "http://www.tei-c.org/ns/1.0", type = Note.class, required = false),
        @XmlElementRef(name = "sic", namespace = "http://www.tei-c.org/ns/1.0", type = Sic.class, required = false),
        @XmlElementRef(name = "specGrpRef", namespace = "http://www.tei-c.org/ns/1.0", type = SpecGrpRef.class, required = false),
        @XmlElementRef(name = "elementSpec", namespace = "http://www.tei-c.org/ns/1.0", type = ElementSpec.class, required = false)
    })
    @XmlMixed
    protected java.util.List<Serializable> content;

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
     * {@link JAXBElement }{@code <}{@link Att }{@code >}
     * {@link Bloc }
     * {@link Region }
     * {@link Add }
     * {@link JAXBElement }{@code <}{@link Object }{@code >}
     * {@link Bibl }
     * {@link Country }
     * {@link GeogName }
     * {@link Address }
     * {@link Unclear }
     * {@link JAXBElement }{@code <}{@link Tag }{@code >}
     * {@link MacroSpec }
     * {@link JAXBElement }{@code <}{@link TeiModelGlobalEdit }{@code >}
     * {@link Media }
     * {@link Q }
     * {@link District }
     * {@link Measure }
     * {@link Ident }
     * {@link BinaryObject }
     * {@link Forename }
     * {@link Title }
     * {@link Reg }
     * {@link Affiliation }
     * {@link JAXBElement }{@code <}{@link Alt }{@code >}
     * {@link ListBibl }
     * {@link Mentioned }
     * {@link JAXBElement }{@code <}{@link Gi }{@code >}
     * {@link Orig }
     * {@link Del }
     * {@link Geo }
     * {@link JAXBElement }{@code <}{@link SpecDesc }{@code >}
     * {@link Abbr }
     * {@link JAXBElement }{@code <}{@link Milestone }{@code >}
     * {@link PersName }
     * {@link Label }
     * {@link Sp }
     * {@link State }
     * {@link AddName }
     * {@link ListRef }
     * {@link JAXBElement }{@code <}{@link SchemaSpec }{@code >}
     * {@link Said }
     * {@link Foreign }
     * {@link Desc }
     * {@link Time }
     * {@link Settlement }
     * {@link ListPlace }
     * {@link ListNym }
     * {@link Idno }
     * {@link SpecGrp }
     * {@link ListEvent }
     * {@link DataSpec }
     * {@link RoleName }
     * {@link EgXML }
     * {@link P }
     * {@link NotatedMusic }
     * {@link Rs }
     * {@link JAXBElement }{@code <}{@link JoinGrp }{@code >}
     * {@link Population }
     * {@link JAXBElement }{@code <}{@link Link }{@code >}
     * {@link PlaceName }
     * {@link JAXBElement }{@code <}{@link LinkGrp }{@code >}
     * {@link OrgName }
     * {@link Climate }
     * {@link JAXBElement }{@code <}{@link Pb }{@code >}
     * {@link Ab }
     * {@link Gloss }
     * {@link Stage }
     * {@link Num }
     * {@link ListPerson }
     * {@link Date }
     * {@link Cit }
     * {@link FloatingText }
     * {@link Name }
     * {@link Location }
     * {@link Eg }
     * {@link Trait }
     * {@link Choice }
     * {@link GenName }
     * {@link Email }
     * {@link JAXBElement }{@code <}{@link AltGrp }{@code >}
     * {@link JAXBElement }{@code <}{@link Ptr }{@code >}
     * {@link JAXBElement }{@code <}{@link TeiModelSegLike }{@code >}
     * {@link ClassSpec }
     * {@link ListOrg }
     * {@link JAXBElement }{@code <}{@link Ref }{@code >}
     * {@link Figure }
     * {@link Offset }
     * {@link JAXBElement }{@code <}{@link Lb }{@code >}
     * {@link L }
     * {@link Table }
     * {@link Terrain }
     * {@link JAXBElement }{@code <}{@link SpecList }{@code >}
     * {@link ModuleSpec }
     * {@link JAXBElement }{@code <}{@link Index }{@code >}
     * {@link JAXBElement }{@code <}{@link Object }{@code >}
     * {@link String }
     * {@link ConstraintSpec }
     * {@link JAXBElement }{@code <}{@link Timeline }{@code >}
     * {@link Emph }
     * {@link Formula }
     * {@link Lg }
     * {@link Distinct }
     * {@link GeogFeat }
     * {@link BiblFull }
     * {@link JAXBElement }{@code <}{@link Object }{@code >}
     * {@link BiblStruct }
     * {@link JAXBElement }{@code <}{@link Val }{@code >}
     * {@link Term }
     * {@link Code }
     * {@link List }
     * {@link Quote }
     * {@link NameLink }
     * {@link JAXBElement }{@code <}{@link Object }{@code >}
     * {@link MeasureGrp }
     * {@link Expan }
     * {@link JAXBElement }{@code <}{@link TeiModelSegLike }{@code >}
     * {@link Hi }
     * {@link Graphic }
     * {@link JAXBElement }{@code <}{@link Gb }{@code >}
     * {@link Surname }
     * {@link OutputRendition }
     * {@link JAXBElement }{@code <}{@link Join }{@code >}
     * {@link SoCalled }
     * {@link JAXBElement }{@code <}{@link Cb }{@code >}
     * {@link JAXBElement }{@code <}{@link Anchor }{@code >}
     * {@link Corr }
     * {@link JAXBElement }{@code <}{@link Object }{@code >}
     * {@link Note }
     * {@link Sic }
     * {@link SpecGrpRef }
     * {@link ElementSpec }
     * 
     * 
     */
    public java.util.List<Serializable> getContent() {
        if (content == null) {
            content = new ArrayList<Serializable>();
        }
        return this.content;
    }

}
